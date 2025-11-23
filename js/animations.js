document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger is not loaded.');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // --- Reusable Fade-in-Up Animation ---
  const fadeUpElements = document.querySelectorAll('.gsap-fade-up');

  fadeUpElements.forEach(el => {
    const delay = el.dataset.delay || 0;

    gsap.fromTo(el, 
      { 
        y: 50, 
        opacity: 0 
      }, 
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%', // Animation starts when the top of the element is 85% from the top of the viewport
          toggleActions: 'play none none none', // Play the animation once and don't reverse
        }
      }
    );
  });
});
