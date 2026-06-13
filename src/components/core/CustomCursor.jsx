import { useEffect, useRef } from 'react';

/**
 * A magnetic dual-ring cursor. A small dot tracks the pointer instantly,
 * while a larger ring trails with easing and expands over interactive targets.
 * Disabled on touch / coarse pointers.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;

    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let hovering = false;
    let rafId;

    const onMove = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const render = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${
        hovering ? 1.8 : 1
      })`;
      rafId = requestAnimationFrame(render);
    };

    const onOver = e => {
      if (e.target.closest('a, button, [data-cursor="hover"], input, textarea')) {
        hovering = true;
        ring.classList.add('is-hovering');
      }
    };
    const onOut = e => {
      if (e.target.closest('a, button, [data-cursor="hover"], input, textarea')) {
        hovering = false;
        ring.classList.remove('is-hovering');
      }
    };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    render();

    return () => {
      cancelAnimationFrame(rafId);
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <style>{`
        .cursor-dot,
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          will-change: transform;
        }
        .cursor-dot {
          width: 7px;
          height: 7px;
          margin: -3.5px 0 0 -3.5px;
          background: #fff;
        }
        .cursor-ring {
          width: 38px;
          height: 38px;
          margin: -19px 0 0 -19px;
          border: 1.5px solid rgba(255, 255, 255, 0.7);
          transition: width 0.25s ease, height 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .cursor-ring.is-hovering {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.9);
        }
        .cursor-ring.is-down {
          background: rgba(255, 255, 255, 0.3);
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
