import useInView from './useInView.js';

/** Fades/slides children in once they scroll into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, on] = useInView({ threshold: 0.12 });
  const { style, ...props } = rest;

  return (
    <Tag ref={ref} className={`rv ${on ? 'in' : ''} ${className}`} style={{ '--d': `${delay}s`, ...style }} {...props}>
      {children}
    </Tag>
  );
}
