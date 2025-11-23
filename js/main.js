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
      s.setAttribute('data-domain', 'advokativanov.eu');
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

  // Scroll indicator (service pages + index hero)
  const hasHero = document.querySelector('#home.hero-section') !== null;
  const isServicePage = document.querySelector('.page-hero') !== null;
  let scrollIndicator = document.getElementById('scroll-indicator');
  // Auto-create indicator on index page if missing
  if (hasHero && !isServicePage && !scrollIndicator) {
    scrollIndicator = document.createElement('button');
    scrollIndicator.id = 'scroll-indicator';
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.setAttribute('aria-label','Скролирайте надолу за още съдържание');
    scrollIndicator.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14" stroke-linecap="round" stroke-linejoin="round" /><path d="M5 12l7 7 7-7" stroke-linecap="round" stroke-linejoin="round" /></svg>';
    document.body.appendChild(scrollIndicator);
  }
  if ((isServicePage || hasHero) && scrollIndicator) {
    // Always start visible on index page; remove any previous hidden classes
    if (hasHero && !isServicePage) {
      scrollIndicator.classList.remove('hide');
      scrollIndicator.classList.remove('forceHide');
    }
    // Utility: determine if page has scrollable overflow
    const canScroll = () => {
      // subtract small epsilon (1px) to avoid false positives due to rounding
      return document.documentElement.scrollHeight - 1 > window.innerHeight;
    };

    // Update visibility based on scrollability
    const updateIndicatorScrollability = () => {
      // On index page always keep visible if scroll possible
      if (hasHero && !isServicePage) {
        if (canScroll()) {
          scrollIndicator.classList.remove('hide');
          scrollIndicator.classList.remove('forceHide');
        } else {
          // If no scroll possible hide gracefully
          scrollIndicator.classList.add('hide');
        }
        return;
      }
      // Service pages original behaviour
      if (!canScroll()) {
        scrollIndicator.classList.add('hide');
      } else if (!scrollIndicator.classList.contains('forceHide')) {
        scrollIndicator.classList.remove('hide');
      }
    };

    // Initial check after a tick (in case fonts/images adjust layout)
    setTimeout(updateIndicatorScrollability, 50);
    // Re-check on resize and orientation changes
    window.addEventListener('resize', updateIndicatorScrollability);
    window.addEventListener('orientationchange', updateIndicatorScrollability);

    // Target to hide near end: try footer fallback
    const lastContentTarget = document.querySelector('footer');
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

    // Fallback hide near bottom (service pages only); index never force-hides
    const hideIfNearBottom = () => {
      if (!scrollIndicator.isConnected) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (isServicePage && scrolled / total > 0.88) {
        scrollIndicator.classList.add('hide');
        scrollIndicator.classList.add('forceHide');
      }
    };
    window.addEventListener('scroll', hideIfNearBottom, { passive: true });

    // If user scrolls back up and page is still scrollable, show again
    const showIfNotBottom = () => {
      if (!scrollIndicator.isConnected) return;
      if (!scrollIndicator.classList.contains('forceHide')) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total <= 0.88 && canScroll()) {
        scrollIndicator.classList.remove('hide');
        scrollIndicator.classList.remove('forceHide');
      }
    };
    window.addEventListener('scroll', showIfNotBottom, { passive: true });

    // Click behavior:
    // Service detail pages: scroll to next h3 or advance
    // Index page: scroll to services section
    scrollIndicator.addEventListener('click', () => {
      if (hasHero && !isServicePage) {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // After scroll, reassess if we still have scroll space
          setTimeout(updateIndicatorScrollability, 400);
          return;
        }
      }
      const headings = Array.from(document.querySelectorAll('main h3'));
      const next = headings.find(h => h.getBoundingClientRect().top > 80);
      if (next) {
        next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
      }
      // Re-evaluate scrollability after movement
      setTimeout(updateIndicatorScrollability, 400);
    });
  }
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  }
});
