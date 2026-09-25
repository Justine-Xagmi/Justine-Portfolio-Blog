
/* =========================================================
   script.js — Full interactivity for the portfolio site

   Sections:
   1. Footer year
   2. Mobile menu toggle
   3. Navbar scroll effect
   4. Active nav-link highlighting (scrollspy)
   5. Typing animation for roles
   6. Scroll-reveal animations
   7. Back-to-top button
   8. Contact form (Formspree + EmailJS Auto-Reply)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Respect reduced-motion preference ---------- */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


  /* ---------- 1. Footer year ---------- */
  const yearEl = document.getElementById('current-year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ---------- 2. Mobile menu toggle ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuToggle && mobileMenu && menuIcon) {

    menuToggle.addEventListener('click', () => {

      const isOpen = !mobileMenu.classList.contains('hidden');

      mobileMenu.classList.toggle('hidden');

      menuToggle.setAttribute(
        'aria-expanded',
        String(!isOpen)
      );

      menuIcon.classList.toggle('fa-bars', isOpen);
      menuIcon.classList.toggle('fa-xmark', !isOpen);
    });


    document.querySelectorAll('[data-mobile]').forEach((link) => {

      link.addEventListener('click', () => {

        mobileMenu.classList.add('hidden');

        menuToggle.setAttribute(
          'aria-expanded',
          'false'
        );

        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-xmark');
      });

    });
  }


  /* ---------- 3. Navbar scroll effect ---------- */
  const header = document.getElementById('site-header');

  const onHeaderScroll = () => {

    if (!header) return;

    if (window.scrollY > 12) {

      header.classList.add(
        'bg-ink-950/90',
        'backdrop-blur',
        'border-ink-800'
      );

    } else {

      header.classList.remove(
        'bg-ink-950/90',
        'backdrop-blur',
        'border-ink-800'
      );
    }
  };

  onHeaderScroll();

  window.addEventListener(
    'scroll',
    onHeaderScroll,
    { passive: true }
  );


  /* ---------- 4. Active nav-link highlighting (scrollspy) ---------- */
  const sections = document.querySelectorAll(
    'main section[id], main#home'
  );

  const navLinks = document.querySelectorAll(
    '.nav-link[data-nav], [data-mobile]'
  );


  const setActiveLink = (id) => {

    navLinks.forEach((link) => {

      const isMatch =
        link.getAttribute('href') === `#${id}`;

      link.classList.toggle(
        'active',
        isMatch
      );

      if (isMatch) {

        link.setAttribute(
          'aria-current',
          'page'
        );

      } else {

        link.removeAttribute(
          'aria-current'
        );
      }
    });
  };


  if (
    'IntersectionObserver' in window &&
    sections.length
  ) {

    const spyObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            setActiveLink(
              entry.target.id || 'home'
            );
          }
        });
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0
      }
    );


    sections.forEach((section) => {
      spyObserver.observe(section);
    });
  }


  /* ---------- 5. Typing animation for roles ---------- */
  const typingEl =
    document.getElementById('typing-role');


  const roles = [
    'IT Specialist',
    'Data Scientist',
    'AI & Technology Enthusiast',
    'Digital Nomad',
    'A Proud Gen Z',
  ];


  if (typingEl) {

    if (prefersReducedMotion) {

      typingEl.textContent =
        'Data Science | AI & Technology Enthusiast | IT Specialist | Digital Nomad | A Proud Gen Z';

    } else {

      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;


      const TYPE_SPEED = 55;
      const DELETE_SPEED = 30;
      const HOLD_TIME = 1400;


      const tick = () => {

        const currentRole =
          roles[roleIndex];


        if (!isDeleting) {

          charIndex++;

          typingEl.textContent =
            currentRole.slice(
              0,
              charIndex
            );


          if (
            charIndex ===
            currentRole.length
          ) {

            isDeleting = true;

            setTimeout(
              tick,
              HOLD_TIME
            );

            return;
          }


          setTimeout(
            tick,
            TYPE_SPEED
          );

        } else {

          charIndex--;

          typingEl.textContent =
            currentRole.slice(
              0,
              charIndex
            );


          if (charIndex === 0) {

            isDeleting = false;

            roleIndex =
              (roleIndex + 1) %
              roles.length;
          }


          setTimeout(
            tick,
            DELETE_SPEED
          );
        }
      };


      tick();
    }
  }


  /* ---------- 6. Scroll-reveal animations ---------- */
  const revealEls =
    document.querySelectorAll('.reveal');


  if (
    prefersReducedMotion ||
    !('IntersectionObserver' in window)
  ) {

    revealEls.forEach((el) => {
      el.classList.add('is-visible');
    });

  } else {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                'is-visible'
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.15
        }
      );


    revealEls.forEach((el) => {
      revealObserver.observe(el);
    });
  }


  /* ---------- 7. Back-to-top button ---------- */
  const backToTopBtn =
    document.getElementById(
      'back-to-top'
    );


  if (backToTopBtn) {

    const toggleBackToTop = () => {

      const shouldShow =
        window.scrollY > 480;


      backToTopBtn.classList.toggle(
        'hidden',
        !shouldShow
      );


      backToTopBtn.classList.toggle(
        'flex',
        shouldShow
      );
    };


    toggleBackToTop();


    window.addEventListener(
      'scroll',
      toggleBackToTop,
      { passive: true }
    );


    backToTopBtn.addEventListener(
      'click',
      () => {

        window.scrollTo({
          top: 0,
          behavior:
            prefersReducedMotion
              ? 'auto'
              : 'smooth'
        });
      }
    );
  }


  /* =========================================================
     8. CONTACT FORM — FORMSPREE + EMAILJS AUTO-REPLY
     ========================================================= */

  const contactForm =
    document.getElementById(
      'contact-form'
    );


  const contactStatus =
    document.getElementById(
      'cf-status'
    );


  if (contactForm) {

    contactForm.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault();


        /* ---------- Get form fields ---------- */
        const nameField =
          document.getElementById(
            'cf-name'
          );

        const emailField =
          document.getElementById(
            'cf-email'
          );

        const subjectField =
          document.getElementById(
            'cf-subject'
          );

        const messageField =
          document.getElementById(
            'cf-message'
          );


        const name =
          nameField
            ? nameField.value.trim()
            : '';

        const email =
          emailField
            ? emailField.value.trim()
            : '';

        const subject =
          subjectField
            ? subjectField.value.trim()
            : '';

        const message =
          messageField
            ? messageField.value.trim()
            : '';


        /* ---------- Basic validation ---------- */
        if (
          !name ||
          !email ||
          !subject ||
          !message
        ) {

          if (contactStatus) {

            contactStatus.textContent =
              'Please fill in every field before sending.';

            contactStatus.classList.remove(
              'text-green-500',
              'text-red-500'
            );

            contactStatus.classList.add(
              'text-amber'
            );
          }

          return;
        }


        /* ---------- Email validation ---------- */
        const emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

          if (contactStatus) {

            contactStatus.textContent =
              'Please enter a valid email address.';

            contactStatus.classList.remove(
              'text-green-500',
              'text-red-500'
            );

            contactStatus.classList.add(
              'text-amber'
            );
          }

          return;
        }


        /* =====================================================
           FORMSPREE CONFIGURATION
           ===================================================== */

        const formspreeEndpoint =
          'https://formspree.io/f/xrpblapj';


        /* =====================================================
           EMAILJS CONFIGURATION
           ===================================================== */

        const emailjsServiceID =
          'service_cwuk9zp';

        const emailjsTemplateID =
          'template_f1h06bl';


        /* ---------- Show sending status ---------- */
        if (contactStatus) {

          contactStatus.classList.remove(
            'text-amber',
            'text-red-500'
          );

          contactStatus.classList.add(
            'text-green-500'
          );

          contactStatus.textContent =
            'Sending your message...';
        }


        /* ---------- Disable submit button ---------- */
        const submitButton =
          contactForm.querySelector(
            'button[type="submit"]'
          );


        if (submitButton) {

          submitButton.disabled = true;

          submitButton.dataset.originalText =
            submitButton.textContent;

          submitButton.textContent =
            'Sending...';
        }


        try {

          /* =================================================
             STEP 1 — PREPARE FORM DATA
             ================================================= */

          const formData =
            new FormData(contactForm);


          /*
           * Ensure the important fields are included.
           * These names must match your HTML.
           */

          formData.set(
            'name',
            name
          );

          formData.set(
            'email',
            email
          );

          formData.set(
            'subject',
            subject
          );

          formData.set(
            'message',
            message
          );


          /* =================================================
             STEP 2 — SEND MESSAGE TO FORMSPREE
             ================================================= */

          const response =
            await fetch(
              formspreeEndpoint,
              {
                method: 'POST',
                body: formData,
                headers: {
                  'Accept':
                    'application/json'
                }
              }
            );


          /* =================================================
             STEP 3 — HANDLE FORMSPREE RESPONSE
             ================================================= */

          if (!response.ok) {

            let errorMessage =
              'Something went wrong. Please try again later.';


            try {

              const data =
                await response.json();


              if (
                data &&
                data.errors &&
                data.errors.length
              ) {

                errorMessage =
                  data.errors
                    .map(
                      (error) =>
                        error.message
                    )
                    .join(' ');
              }

            } catch (error) {

              /*
               * Keep the default error message
               * if Formspree does not return JSON.
               */
            }


            throw new Error(
              errorMessage
            );
          }


          /* =================================================
             STEP 4 — SEND AUTOMATIC REPLY THROUGH EMAILJS
             ================================================= */

          /*
           * Formspree has successfully received the message.
           *
           * EmailJS now sends the automatic reply using
           * the template configured in your EmailJS dashboard.
           *
           * The template receives:
           *
           * {{name}}
           * {{email}}
           * {{subject}}
           * {{message}}
           */

          if (
            typeof emailjs !== 'undefined'
          ) {

            try {

              await emailjs.sendForm(
                emailjsServiceID,
                emailjsTemplateID,
                contactForm
              );

              console.log(
                'EmailJS automatic reply sent successfully.'
              );

            } catch (emailjsError) {

              /*
               * Important:
               *
               * Formspree has already received the message.
               * Therefore, an EmailJS failure should NOT make
               * the visitor think their message failed.
               */

              console.error(
                'EmailJS automatic reply failed:',
                emailjsError
              );
            }

          } else {

            /*
             * EmailJS library was not loaded.
             *
             * Formspree still received the message.
             */

            console.error(
              'EmailJS library is not loaded.'
            );
          }


          /* =================================================
             STEP 5 — SUCCESS MESSAGE
             ================================================= */

          if (contactStatus) {

            contactStatus.classList.remove(
              'text-amber',
              'text-red-500'
            );

            contactStatus.classList.add(
              'text-green-500'
            );

            contactStatus.textContent =
              'Thank you! Your message has been sent successfully.';
          }


          /* ---------- Clear form after successful submission ---------- */

          contactForm.reset();


        } catch (error) {

          /* =================================================
             FORM SUBMISSION ERROR
             ================================================= */

          console.error(
            'Formspree submission error:',
            error
          );


          if (contactStatus) {

            contactStatus.classList.remove(
              'text-amber',
              'text-green-500'
            );

            contactStatus.classList.add(
              'text-red-500'
            );

            contactStatus.textContent =
              error.message ||
              'Unable to send your message. Please check your internet connection and try again.';
          }


        } finally {

          /* =================================================
             RE-ENABLE SUBMIT BUTTON
             ================================================= */

          if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
              submitButton.dataset.originalText ||
              'Send Message';
          }
        }

      }
    );
  }

});