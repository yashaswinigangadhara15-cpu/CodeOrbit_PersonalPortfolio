/* =========================================================
   YASHASWINI G — PERSONAL PORTFOLIO
   Vanilla JavaScript: navigation, photo upload, form, reveal
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
  initPhotoUpload();
  initContactForm();
  initRevealAnimations();
});

/* ---------------------------------------------------------
   1. MOBILE NAVIGATION (hamburger menu)
--------------------------------------------------------- */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (!navToggle || !navMenu) return;

  const closeMenu = () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  navToggle.addEventListener('click', toggleMenu);

  // Close the mobile menu after clicking any nav link
  navMenu.querySelectorAll('.nav-link, .nav-cta').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ---------------------------------------------------------
   2. ACTIVE NAV LINK ON SCROLL
--------------------------------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   3. PROFILE PHOTO UPLOAD, PREVIEW & PERSISTENCE
--------------------------------------------------------- */
function initPhotoUpload() {
  const photoInput = document.getElementById('photoInput');
  const profileImg = document.getElementById('profileImg');
  const photoPlaceholder = document.getElementById('photoPlaceholder');
  const photoError = document.getElementById('photoError');
  const photoBtnLabel = document.getElementById('photoBtnLabel');

  if (!photoInput || !profileImg || !photoPlaceholder) return;

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
  const STORAGE_KEY = 'yashaswini_profile_photo';

  const showImage = (dataUrl) => {
    profileImg.src = dataUrl;
    profileImg.classList.remove('hidden');
    photoPlaceholder.classList.add('hidden');
    if (photoBtnLabel) photoBtnLabel.textContent = 'Change Photo';
  };

  const showError = (message) => {
    if (photoError) photoError.textContent = message;
  };

  const clearError = () => showError('');

  // Load saved photo from localStorage on page load
  try {
    const savedPhoto = localStorage.getItem(STORAGE_KEY);
    if (savedPhoto) {
      showImage(savedPhoto);
    }
  } catch (err) {
    // localStorage may be unavailable (e.g. private browsing) — fail silently
    console.warn('Could not access localStorage for saved photo:', err);
  }

  photoInput.addEventListener('change', (event) => {
    clearError();
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      showError('Please upload a JPG, JPEG, or PNG image.');
      photoInput.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      showError('File is too large. Maximum size is 5MB.');
      photoInput.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const dataUrl = e.target.result;
      showImage(dataUrl);
      try {
        localStorage.setItem(STORAGE_KEY, dataUrl);
      } catch (err) {
        showError('Photo previewed, but could not be saved for next visit (storage full).');
      }
    };

    reader.onerror = () => {
      showError('Something went wrong reading that file. Please try again.');
    };

    reader.readAsDataURL(file);
  });
}

/* ---------------------------------------------------------
   4. CONTACT FORM VALIDATION
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formSuccess');

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setFieldError = (input, errorEl, message) => {
    if (errorEl) errorEl.textContent = message;
    if (input) input.closest('.form-group')?.classList.toggle('error', Boolean(message));
  };

  const validate = () => {
    let isValid = true;

    if (!nameInput.value.trim()) {
      setFieldError(nameInput, nameError, 'Please enter your name.');
      isValid = false;
    } else {
      setFieldError(nameInput, nameError, '');
    }

    const emailValue = emailInput.value.trim();
    if (!emailValue) {
      setFieldError(emailInput, emailError, 'Please enter your email.');
      isValid = false;
    } else if (!EMAIL_REGEX.test(emailValue)) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      setFieldError(emailInput, emailError, '');
    }

    if (!messageInput.value.trim()) {
      setFieldError(messageInput, messageError, 'Please enter a message.');
      isValid = false;
    } else {
      setFieldError(messageInput, messageError, '');
    }

    return isValid;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formSuccess.textContent = '';

    if (!validate()) return;

    // No backend — this form does not send a real email.
    formSuccess.textContent = 'Thanks for reaching out! Your message has been received.';
    form.reset();

    setFieldError(nameInput, nameError, '');
    setFieldError(emailInput, emailError, '');
    setFieldError(messageInput, messageError, '');
  });
}

/* ---------------------------------------------------------
   5. SCROLL REVEAL ANIMATIONS
--------------------------------------------------------- */
function initRevealAnimations() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}
