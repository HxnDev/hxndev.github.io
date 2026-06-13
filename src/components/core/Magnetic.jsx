import { useRef } from 'react';

/**
 * Wraps any element and gives it a magnetic pull toward the cursor.
 * Use `strength` to tune how far it leans.
 */
const Magnetic = ({ children, strength = 0.35, className, style }) => {
  const ref = useRef(null);

  const handleMove = e => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{
        display: 'inline-block',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export default Magnetic;
