"use client";

// Add the 'visible' class to elements with 'section-transition' class
// when they are scrolled into view
export function initSectionTransitions() {
  // If not in browser context, return early
  if (typeof window === 'undefined') return;

  // Get all elements with the section-transition class
  const sections = document.querySelectorAll('.section-transition');

  // Function to check if an element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  };

  // Function to handle scroll event
  const handleScroll = () => {
    sections.forEach(section => {
      if (isInViewport(section) && !section.classList.contains('visible')) {
        section.classList.add('visible');
      }
    });
  };

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Trigger once on load for elements already in viewport
  handleScroll();

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

// Smooth scroll to element by ID
export function scrollToElement(elementId, offset = 0) {
  // If not in browser context, return early
  if (typeof window === 'undefined') return;

  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Add parallax effect to elements
export function initParallaxEffect() {
  // If not in browser context, return early
  if (typeof window === 'undefined') return;

  const parallaxElements = document.querySelectorAll('.parallax');

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      const offset = scrollTop * speed;
      element.style.transform = `translateY(${offset}px)`;
    });
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

// Animate count up for numbers
export function animateCounters() {
  // If not in browser context, return early
  if (typeof window === 'undefined') return;

  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    // Get the target value to count to
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = parseInt(counter.getAttribute('data-duration') || 2000, 10);
    const increment = target / duration * 10; // Update every 10ms

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      counter.textContent = Math.floor(current);

      if (current >= target) {
        counter.textContent = target; // Ensure we end on exact target
        clearInterval(timer);
      }
    }, 10);
  });
}
