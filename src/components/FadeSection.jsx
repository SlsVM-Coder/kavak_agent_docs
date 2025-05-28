import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FadeSection({ children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section ref={ref} style={{ margin: "4rem 0" }}>
      {children}
    </section>
  );
}
