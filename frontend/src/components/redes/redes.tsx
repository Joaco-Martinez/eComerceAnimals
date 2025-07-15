"use client"
import { useEffect } from "react";

export default function InstagramFeed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full">
      <iframe
        src="http://lightwidget.com/widgets/bc831e37baf55a549e6d9b89bbc0bce7.html"
        scrolling="no"
        allowTransparency={true}
        className="lightwidget-widget"
        style={{ width: "100%", border: "0", overflow: "hidden" }}
      ></iframe>
    </div>
  );
}
