"use client"
import { useState } from "react";
const sliderData = {
  title: "Radiographs of the Elbow",
  slides: [
    {
      id: 1,
      imageUrl: "https://placehold.co/400x280/1a1a1a/ffffff?text=Lateral+X-Ray",
      imageAlt: "Lateral Radiograph of the Elbow",
      slideTitle: "Lateral Radiograph of the Elbow",
      description:
        "The anterior humeral line and radiocapitellar line are normal. However, an anterior fat pad is present, suggesting a jo...",
      credit: "Image courtesy of Danielle Campagne, MD.",
    },
    {
      id: 2,
      imageUrl: "https://placehold.co/400x280/1a1a1a/ffffff?text=AP+X-Ray",
      imageAlt: "AP Radiograph of the Elbow",
      slideTitle: "AP Radiograph of the Elbow",
      description:
        "Anteroposterior view demonstrating the normal bony alignment of the elbow joint. No acute fracture or dislocation is identified...",
      credit: "Image courtesy of Danielle Campagne, MD.",
    },
  ],
};

const ExpandIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
  </svg>
);

const ChevronLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
);

export default function ImageSlider({ data = sliderData }) {
  const [current, setCurrent] = useState(0);
  const total = data.slides.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const slide = data.slides[current];

  return (
    <div className="max-w-xl mx-auto border border-gray-200 rounded-xl bg-white overflow-hidden font-sans shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="text-sm font-semibold text-teal-700">{data.title}</span>
        <button className="bg-teal-700 hover:bg-teal-800 p-1.5 rounded transition-colors">
          <ExpandIcon />
        </button>
      </div>

      {/* Slider body */}
      <div className="relative flex items-center px-12 py-6">
        {/* Prev button */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 flex items-center justify-center transition-colors"
        >
          <ChevronLeft />
        </button>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center gap-4">
          {/* Image */}
          <div className="w-full max-w-xs">
            <img
              src={slide.imageUrl}
              alt={slide.imageAlt}
              className="w-full rounded object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full">
            <p className="text-sm font-semibold text-teal-700 mb-1">{slide.slideTitle}</p>
            <p className="text-sm text-gray-700 leading-relaxed mb-1">
              {slide.description}{" "}
              <a href="#" className="text-teal-700 hover:underline font-medium">
                read more
              </a>
            </p>
            <p className="text-xs text-gray-400">{slide.credit}</p>
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-4">
        {data.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-teal-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}