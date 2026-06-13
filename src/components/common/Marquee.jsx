/** Infinite horizontal ticker. Items are duplicated for a seamless loop. */
const Marquee = ({ items = [] }) => {
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
