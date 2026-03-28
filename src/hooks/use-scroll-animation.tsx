import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px 12% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

export const ScrollAnimatedSection = ({
  children,
  className = '',
  delay = 0,
  /** Skip scroll-triggered hide — use for sections that must be visible immediately (e.g. below sticky headers). */
  alwaysVisible = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  alwaysVisible?: boolean;
}) => {
  const { ref, isVisible } = useScrollAnimation();

  if (alwaysVisible) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-0 translate-y-10 blur-sm'
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
};