import _Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { useEffect, useCallback } from "react";

export default function ClientBody({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}): JSX.Element {
    const initSectionTransitions = useCallback(() => {
        // Example implementation: Add a fade-in effect to sections
        const _sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver(
            (_entries) => {
                _entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        _sections.forEach((_section) => observer.observe(_section));

        // Cleanup function to disconnect the observer
        return () => {
            observer.disconnect();
        };
    }, []);

    const initParallaxEffect = useCallback(() => {
        // Example implementation: Add a parallax scrolling effect to elements with the 'parallax' class
        const _parallaxElements = document.querySelectorAll('.parallax');

        const handleScroll = () => {
            const _scrollPosition = window.scrollY;
            _parallaxElements.forEach((element) => {
                const _speed = parseFloat(element.getAttribute('data-speed') || '0.5');
                (element as HTMLElement).style.transform = `translateY(${_scrollPosition * _speed}px)`;
            });
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Initialize animations when component mounts
    useEffect(() => {
        // Start section transitions
        const _cleanup1 = initSectionTransitions();
        // Start parallax effects
        const _cleanup2 = initParallaxEffect();

        // Cleanup on component unmount
        return () => {
            _cleanup1?.();
            _cleanup2?.();
        };
    }, [initSectionTransitions, initParallaxEffect]);

    // Render the layout with Header, children, and Footer
    return (
        <div className={className}>
            <Header />
            {children}
            <_Footer />
        </div>
    );
}

