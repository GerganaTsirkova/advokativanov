// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic'
});

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 500);
  }
});

// Set the current year in the footer
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Back to Top removed — no element to control

  // Cookie consent banner
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      banner.style.display = 'block';
    }
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    const loadAnalytics = () => {
      if (document.getElementById('analytics-script')) return;
      // Example: Plausible (replace data-domain with real domain) or Google Analytics
      const s = document.createElement('script');
      s.defer = true;
      s.id = 'analytics-script';
      // Placeholder: Plausible
      s.setAttribute('data-domain', 'advokativanov.bg');
      s.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(s);
    };
    if (consent === 'accepted') {
      loadAnalytics();
    }
    acceptBtn?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      banner.remove();
      loadAnalytics();
    });
    declineBtn?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      banner.remove();
    });
  }

  // Auto-collapse navbar on mobile after link click
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const collapseElem = document.querySelector('.navbar-collapse');
  if (navLinks.length && navbarToggler && collapseElem) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const isTogglerVisible = window.getComputedStyle(navbarToggler).display !== 'none';
        if (isTogglerVisible && collapseElem.classList.contains('show')) {
          collapseElem.classList.remove('show');
          navbarToggler.setAttribute('aria-expanded', 'false');
          navbarToggler.classList.add('collapsed');
        }
      });
    });
  }

  // Scroll indicator for service pages
  const isServicePage = document.querySelector('.page-hero') !== null;
  const scrollIndicator = document.getElementById('scroll-indicator');
  if (isServicePage && scrollIndicator) {
    const lastContentTarget = document.querySelector('.action-buttons-group') || document.querySelector('footer');
    if (lastContentTarget) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            scrollIndicator.classList.add('hide');
          }
        });
      }, { threshold: 0.2 });
      observer.observe(lastContentTarget);
    }

    // Fallback hide near bottom
    const hideIfNearBottom = () => {
      if (scrollIndicator.classList.contains('hide')) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total > 0.88) {
        scrollIndicator.classList.add('hide');
      }
    };
    window.addEventListener('scroll', hideIfNearBottom, { passive: true });

    // Click scroll to next heading or advance
    scrollIndicator.addEventListener('click', () => {
      const headings = Array.from(document.querySelectorAll('main h3'));
      const next = headings.find(h => h.getBoundingClientRect().top > 80);
      if (next) {
        next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
      }
    });
  }
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  }
});
