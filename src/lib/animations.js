"use client";

// Add the 'visible' class to elements with 'section-transition' class
// when they are scrolled into view
export function initSectionTransitions() {
    // If not in browser context, return early
    if (typeof window === 'undefined') return;

    // Get all elements with the section-transition class
    const _sections = document.querySelectorAll('.section-transition');

    // Function to check if an element is in viewport
    const _isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    };

    // Function to handle scroll event
    const handleScroll = () => {
        _sections.forEach(section => {
            if (_isInViewport(section) && !section.classList.contains('visible')) {
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
export function scrollToElement(_elementId, _offset = 0) {
    // If not in browser context, return early
    if (typeof window === 'undefined') return;

    const element = document.getElementById(_elementId);
    if (!element) return;

    const _elementPosition = element.getBoundingClientRect().top;
    const _offsetPosition = _elementPosition + window.pageYOffset - _offset;

    window.scrollTo({
        top: _offsetPosition,
        behavior: 'smooth'
    });
}

// Add parallax effect to elements
export function initParallaxEffect() {
    // If not in browser context, return early
    if (typeof window === 'undefined') return;

    const _parallaxElements = document.querySelectorAll('.parallax');

    const handleScroll = () => {
        const _scrollTop = window.pageYOffset;

        _parallaxElements.forEach(element => {
            const _speed = element.getAttribute('data-speed') || 0.5;
            const _offset = _scrollTop * _speed;
            element.style.transform = `translateY(${_offset}px)`;
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

    const _counters = document.querySelectorAll('.counter');

    _counters.forEach(counter => {
        // Get the target value to count to
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const _duration = parseInt(counter.getAttribute('data-duration') || 2000, 10);
        const _increment = target / _duration * 10; // Update every 10ms

        let current = 0;
        const _timer = setInterval(() => {
            current += _increment;
            counter.textContent = Math.floor(current);

            if (current >= target) {
                counter.textContent = target; // Ensure we end on exact target
                clearInterval(_timer);
            }
        }, 10);
    });
}
