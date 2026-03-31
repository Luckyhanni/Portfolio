"use client";

import { useEffect, useState } from "react";

type EmbedPlayerProps = {
  src: string;
  title: string;
  aspectRatio?: string;
  showFullscreenButton?: boolean;
};

export default function EmbedPlayer({
  src,
  title,
  aspectRatio,
  showFullscreenButton = false,
}: EmbedPlayerProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isPortraitViewport, setIsPortraitViewport] = useState(true);

  useEffect(() => {
    if (!overlayOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [overlayOpen]);

  useEffect(() => {
    function updateViewportOrientation() {
      setIsPortraitViewport(window.innerHeight >= window.innerWidth);
    }

    updateViewportOrientation();
    window.addEventListener("resize", updateViewportOrientation);
    window.addEventListener("orientationchange", updateViewportOrientation);

    return () => {
      window.removeEventListener("resize", updateViewportOrientation);
      window.removeEventListener("orientationchange", updateViewportOrientation);
    };
  }, []);

  const overlayShellStyle = isPortraitViewport
    ? styles.rotatedShellPortrait
    : styles.rotatedShellLandscape;
  const overlayFrameStyle = isPortraitViewport
    ? styles.overlayFramePortrait
    : styles.overlayFrameLandscape;

  return (
    <>
      <div style={styles.wrap}>
        <div
          style={{
            ...styles.frame,
            ...(aspectRatio ? { aspectRatio } : null),
          }}
        >
          <iframe
            src={src}
            title={title}
            style={styles.iframe}
            loading="lazy"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {showFullscreenButton ? (
          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => setOverlayOpen(true)}
              style={styles.button}
            >
              Querformat-Vollbild
            </button>
            <p style={styles.hint}>
              Öffnet das Spiel groß im Querformat, auch wenn das Handy hochkant gehalten wird.
            </p>
          </div>
        ) : null}
      </div>

      {overlayOpen ? (
        <div style={styles.overlay}>
          <button
            type="button"
            onClick={() => setOverlayOpen(false)}
            style={styles.closeButton}
            aria-label="Vollbild schließen"
          >
            ×
          </button>

          <div style={styles.overlayViewport}>
            <div style={overlayShellStyle}>
              <div
                style={{
                  ...overlayFrameStyle,
                  ...(aspectRatio ? { aspectRatio } : null),
                }}
              >
                <iframe
                  src={src}
                  title={`${title} Vollbild`}
                  style={styles.iframe}
                  loading="eager"
                  allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    display: "grid",
    gap: 12,
  },
  frame: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(143, 168, 203, 0.18)",
    background: "#081018",
  },
  iframe: {
    border: 0,
    width: "100%",
    height: "100%",
  },
  actions: {
    display: "grid",
    gap: 8,
    justifyItems: "start",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(143, 168, 203, 0.26)",
    background: "rgba(143, 168, 203, 0.12)",
    color: "#edf4ff",
    fontSize: 14,
    fontWeight: 800,
    cursor: "pointer",
  },
  hint: {
    margin: 0,
    color: "rgba(223, 233, 248, 0.74)",
    fontSize: 13,
    lineHeight: 1.5,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    background: "rgba(5, 9, 14, 0.96)",
  },
  closeButton: {
    position: "absolute",
    top: "calc(env(safe-area-inset-top, 0px) + 14px)",
    right: "calc(env(safe-area-inset-right, 0px) + 14px)",
    zIndex: 3,
    width: 44,
    height: 44,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    border: "1px solid rgba(143, 168, 203, 0.28)",
    background: "rgba(16, 23, 32, 0.86)",
    color: "#edf4ff",
    fontSize: 28,
    lineHeight: 1,
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
  },
  overlayViewport: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  rotatedShellPortrait: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100dvh",
    height: "100dvw",
    transform: "translate(-50%, -50%) rotate(90deg)",
    transformOrigin: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    boxSizing: "border-box",
  },
  rotatedShellLandscape: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    boxSizing: "border-box",
  },
  overlayFramePortrait: {
    width: "100%",
    maxWidth: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(143, 168, 203, 0.18)",
    background: "#081018",
    boxShadow: "0 20px 44px rgba(0, 0, 0, 0.35)",
  },
  overlayFrameLandscape: {
    width: "100%",
    maxWidth: "100%",
    maxHeight: "calc(100dvh - 32px)",
    aspectRatio: "16 / 9",
    borderRadius: 18,
    overflow: "hidden",
    border: "1px solid rgba(143, 168, 203, 0.18)",
    background: "#081018",
    boxShadow: "0 20px 44px rgba(0, 0, 0, 0.35)",
  },
};
