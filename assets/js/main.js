(function() {
  "use strict";

  // Selector helper function for single or multiple elements
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  // Event listener helper function for single or multiple elements
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      const elements = all ? selectEl : [selectEl];
      elements.forEach(e => e.addEventListener(type, listener));
    }
  };

  // Scroll event listener function
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  // Navbar links active state on scroll
  const navbarLinksActive = () => {
    let position = window.scrollY + 200;
    select('#navbar .scrollto', true).forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarLinksActive);
  onscroll(document, navbarLinksActive);

  // Smooth scroll to an element with header offset
  const scrollTo = (el) => {
    window.scrollTo({
      top: select(el).offsetTop,
      behavior: 'smooth'
    });
  };

  // Back to top button visibility
  const backToTopVisibility = () => {
    const backToTop = select('.back-to-top');
    if (backToTop) {
      window.scrollY > 100 ? backToTop.classList.add('active') : backToTop.classList.remove('active');
    }
  };
  window.addEventListener('load', backToTopVisibility);
  onscroll(document, backToTopVisibility);

  // Mobile navigation toggle
  on('click', '.mobile-nav-toggle', function() {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Scroll with offset on page load with hash links in the url
  window.addEventListener('load', () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollTo(window.location.hash);
    }
  });

  // Scroll with offset on link click
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();
      let body = select('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollTo(this.hash);
    }
  }, true);

  // Activation of animations on scroll
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  // Additional functionalities like sliders or lightboxes can be initialized here
  // For example, initiating a portfolio lightbox
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  // Portfolio details slider
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // Handling form submission (example)
  const contactForm = select('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Form submission logic here
      alert('Form submitted! We will be in touch.');
    });
  }

  // You can add more event listeners and functionalities as needed

})();
