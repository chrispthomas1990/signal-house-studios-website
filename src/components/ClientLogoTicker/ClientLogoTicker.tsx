import { type CSSProperties, type PointerEvent, useEffect, useRef } from "react";
import { clientLogos, normalizeTickerPosition } from "./clientLogos";
import "./ClientLogoTicker.css";

function ClientLogoItems({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="client-logos__group"
      aria-label={duplicate ? undefined : "Client logos"}
      aria-hidden={duplicate ? "true" : undefined}
    >
      {clientLogos.map((logo) => (
        <li className="client-logos__box" key={logo.name}>
          <img
            src={logo.src}
            alt={duplicate ? "" : logo.alt}
            style={{ "--client-logo-scale": logo.scale } as CSSProperties}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientLogoTicker() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null);
  const interactingRef = useRef(false);
  const touchResumeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const groups = viewport.querySelectorAll<HTMLElement>(".client-logos__group");
    const measureLoopWidth = () =>
      groups[1].getBoundingClientRect().left - groups[0].getBoundingClientRect().left;
    let loopWidth = measureLoopWidth();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let previousTime = performance.now();
    let tickerPosition = loopWidth;
    let wasInteracting = false;
    let frameId = 0;
    const resizeObserver = new ResizeObserver(() => {
      const nextLoopWidth = measureLoopWidth();

      if (nextLoopWidth <= 0 || nextLoopWidth === loopWidth) return;

      const loopProgress = loopWidth > 0 ? tickerPosition / loopWidth : 1;
      loopWidth = nextLoopWidth;
      tickerPosition = normalizeTickerPosition(loopProgress * loopWidth, loopWidth);
      viewport.scrollLeft = tickerPosition;
    });

    viewport.scrollLeft = tickerPosition;
    resizeObserver.observe(viewport);

    const animate = (currentTime: number) => {
      const elapsed = Math.min(currentTime - previousTime, 50);
      previousTime = currentTime;

      if (interactingRef.current) {
        wasInteracting = true;
      } else {
        if (wasInteracting) {
          tickerPosition = viewport.scrollLeft;
          wasInteracting = false;
        }

        if (!reducedMotion) tickerPosition += (loopWidth / 60000) * elapsed;

        tickerPosition = normalizeTickerPosition(tickerPosition, loopWidth);

        viewport.scrollLeft = tickerPosition;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      if (touchResumeTimerRef.current !== null) window.clearTimeout(touchResumeTimerRef.current);
    };
  }, []);

  const scheduleTouchResume = () => {
    if (touchResumeTimerRef.current !== null) window.clearTimeout(touchResumeTimerRef.current);
    touchResumeTimerRef.current = window.setTimeout(() => {
      interactingRef.current = false;
      touchResumeTimerRef.current = null;
    }, 160);
  };

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    interactingRef.current = true;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: viewport.scrollLeft };
    viewport.dataset.dragging = "true";
    viewport.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragRef.current;
    const viewport = viewportRef.current;
    if (!dragState || !viewport || dragState.pointerId !== event.pointerId) return;
    viewport.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const viewport = viewportRef.current;
    interactingRef.current = false;
    if (!viewport) return;

    const groups = viewport.querySelectorAll<HTMLElement>(".client-logos__group");
    const loopWidth =
      groups[1].getBoundingClientRect().left - groups[0].getBoundingClientRect().left;
    viewport.scrollLeft = normalizeTickerPosition(viewport.scrollLeft, loopWidth);
    if (dragRef.current?.pointerId !== event.pointerId) return;

    viewport.removeAttribute("data-dragging");
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  };

  return (
    <div
      ref={viewportRef}
      className="client-logos__viewport"
      role="region"
      aria-label="Swipeable client logo ticker"
      onPointerDown={startDragging}
      onPointerMove={drag}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onTouchStart={() => {
        if (touchResumeTimerRef.current !== null) {
          window.clearTimeout(touchResumeTimerRef.current);
          touchResumeTimerRef.current = null;
        }
        interactingRef.current = true;
      }}
      onTouchEnd={scheduleTouchResume}
      onTouchCancel={scheduleTouchResume}
      onScroll={() => {
        if (interactingRef.current) scheduleTouchResume();
      }}
    >
      <div className="client-logos__track">
        <ClientLogoItems duplicate />
        <ClientLogoItems />
        <ClientLogoItems duplicate />
      </div>
    </div>
  );
}
