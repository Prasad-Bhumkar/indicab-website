import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { useEffect } from "react";

export default function ClientBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Initialize animations when component mounts
  useEffect(() => {
    // Start section transitions
    const cleanup1 = initSectionTransitions();
    // Start parallax effects
    const cleanup2 = initParallaxEffect();

    // Cleanup on component unmount
    return () => {
      cleanup1?.();
      cleanup2?.();
    };
  }, []);
  // Remove this duplicate useEffect block below
  // ... existing code ...

  // Render the layout with Header, children, and Footer
  return (
    <div className={className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
function initSectionTransitions() {
  // Example implementation: Add a fade-in effect to sections
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));

  // Cleanup function to disconnect the observer
  return () => {
    observer.disconnect();
  };
}
function initParallaxEffect() {
  // Example implementation: Add a parallax scrolling effect to elements with the 'parallax' class
  const parallaxElements = document.querySelectorAll('.parallax');

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
      (element as HTMLElement).style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  };

  // Attach the scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Cleanup function to remove the event listener
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}
// The useEffect function is a React hook provided by React and should not be redefined.
// Ensure you import it from React at the top of the file.
// Remove the placeholder implementation as it is unnecessary and incorrect.

