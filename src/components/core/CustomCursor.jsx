import { useEffect, useRef } from 'react';

/**
 * A dual-layer cursor: a tiny dot that tracks the pointer 1:1 and a larger ring
 * that trails with easing. Over interactive elements it expands; over elements
 * with a `data-cursor-label` it morphs into a labelled disc (e.g. "Open").
 * Disabled on touch / coarse pointers.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;

    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...mouse };
    const mode = { current: 'default' };
    let rafId;

    const move = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    const render = () => {
      // Snappier when labelled so the disc keeps up with reading.
      const ease = mode.current === 'label' ? 0.28 : 0.2;
      ringPos.x += (mouse.x - ringPos.x) * ease;
      ringPos.y += (mouse.y - ringPos.y) * ease;
      const scale = mode.current === 'hover' ? 1.7 : 1;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      rafId = requestAnimationFrame(render);
    };

    // mouseover bubbles and fires on every element entered, so we can derive
    // the current mode purely from the element under the cursor.
    const over = e => {
      const labelEl = e.target.closest('[data-cursor-label]');
      const interactive = e.target.closest('a, button, input, textarea, [data-cursor="hover"]');
      if (labelEl) {
        mode.current = 'label';
        label.textContent = labelEl.getAttribute('data-cursor-label');
        ring.classList.add('is-label');
        ring.classList.remove('is-hovering');
      } else if (interactive) {
        mode.current = 'hover';
        ring.classList.add('is-hovering');
        ring.classList.remove('is-label');
        label.textContent = '';
      } else {
        mode.current = 'default';
        ring.classList.remove('is-hovering', 'is-label');
        label.textContent = '';
      }
    };

    const down = () => ring.classList.add('is-down');
    const up = () => ring.classList.remove('is-down');
    const leave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const enter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    render();

    return () => {
      cancelAnimationFrame(rafId);
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <style>{`
        .cursor-dot,
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
        }
        .cursor-dot {
          width: 6px;
          height: 6px;
          background: var(--cyan);
          mix-blend-mode: difference;
          transition: opacity 0.3s ease;
        }
        .cursor-ring {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border: 1.5px solid rgba(255, 255, 255, 0.55);
          transition:
            width 0.3s var(--ease-out),
            height 0.3s var(--ease-out),
            background 0.3s ease,
            border-color 0.3s ease,
            opacity 0.3s ease;
        }
        .cursor-ring.is-hovering {
          border-color: var(--cyan);
        }
        .cursor-ring.is-down {
          background: rgba(91, 233, 255, 0.15);
        }
        .cursor-ring.is-label {
          width: 84px;
          height: 84px;
          background: var(--cyan);
          border-color: transparent;
        }
        .cursor-label {
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #07080d;
          opacity: 0;
          transform: scale(0.7);
          transition: opacity 0.25s ease, transform 0.25s var(--ease-out);
        }
        .cursor-ring.is-label .cursor-label {
          opacity: 1;
          transform: scale(1);
        }
        @media (hover: none), (pointer: coarse) {
          .cursor-dot,
          .cursor-ring {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
