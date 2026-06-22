"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function FitText({ children, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;
      inner.style.fontSize = "200px";
      const scale = wrap.offsetWidth / inner.scrollWidth;
      inner.style.fontSize = Math.floor(200 * scale) + "px";
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div ref={wrapRef} style={{ width: "100%", overflow: "hidden" }}>
      <div
        ref={innerRef}
        className={className}
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 0.9,
          whiteSpace: "nowrap",
          display: "flex",
          gap: "0.25em",
        }}
      >
        {children}
      </div>
    </div>
  );
}
