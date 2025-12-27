import React from "react";

export default function BNArrow({ onBack, onNext, title }) {
  return (
    <div className="flex items-center justify-between py-12 relative">
      {/* Left Arrow */}
      <button
        onClick={onBack}
        className="bg-pink-100 text-pink-600 hover:bg-pink-200 rounded-full w-12 h-12 flex items-center justify-center shadow-md"
      >
        &#8592;
      </button>

      {/* Title */}
      <h1
        className="text-4xl font-extrabold text-white text-center flex-1"
        style={{ letterSpacing: "1.5em" }}
      >
        {title}
      </h1>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        className="bg-pink-100 text-pink-600 hover:bg-pink-200 rounded-full w-12 h-12 flex items-center justify-center shadow-md"
      >
        &#8594;
      </button>
    </div>
  );
}
