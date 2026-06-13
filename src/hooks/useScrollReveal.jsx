import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Observes every [data-reveal] element and adds `is-visible` as it enters the
 * viewport. Because pages are lazy-loaded, a MutationObserver keeps watching
 * for elements that mount after the initial scan. Supports staggering via
 * `data-reveal-delay`. Re-initializes on route change.
 */
export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      const reveal = () =>
        document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
      reveal();
      const mo = new MutationObserver(reveal);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-reveal-delay') || 0;
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(el => io.observe(el));
    };

    // Coalesce bursts of DOM mutations (route changes, layout animations) into
    // a single scan per frame so we never thrash the main thread.
    let scheduled = false;
    const scheduleScan = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        scan();
      });
    };

    scan();
    // Catch elements mounted later (lazy pages, async data, etc.)
    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });

    // A couple of safety scans in case timing is unlucky.
    const t1 = setTimeout(scan, 200);
    const t2 = setTimeout(scan, 800);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);
};

export default useScrollReveal;
