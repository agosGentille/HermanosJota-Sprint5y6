import React, { useEffect, useRef } from "react";

let scriptLoaded = false;

export default function ReCaptchaCheckbox({ siteKey, onVerify }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  if (!siteKey) {
    throw new Error("ReCaptchaCheckbox requiere una siteKey");
  }

  useEffect(() => {
    if (scriptLoaded) return;

    const existing = document.querySelector('script[src*="recaptcha/api.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?hl=es";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
    scriptLoaded = true;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        window.grecaptcha &&
        window.grecaptcha.render &&
        containerRef.current
      ) {
        if (widgetIdRef.current !== null) {
          clearInterval(interval);
          return;
        }

        const widgetId = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => {
            if (onVerify) onVerify(token);
          },
          "expired-callback": () => {
            if (widgetIdRef.current !== null) {
              window.grecaptcha.reset(widgetIdRef.current);
            }
          },
        });

        widgetIdRef.current = widgetId;
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [siteKey, onVerify]);

  return (
    <div
      data-testid="recaptcha-container"
      ref={containerRef}
      role="presentation"
    />
  );
}
