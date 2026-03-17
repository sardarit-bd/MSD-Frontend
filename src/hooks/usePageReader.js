import { useRef } from "react";

export default function usePageReader(containerRef) {
  const nodesRef = useRef([]);

  const collectTextNodes = (node) => {
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;

          const parent = node.parentElement?.tagName;

          const skip = ["SCRIPT", "STYLE", "BUTTON", "SVG"];
          if (skip.includes(parent)) return NodeFilter.FILTER_REJECT;

          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    let current;
    const nodes = [];

    while ((current = walker.nextNode())) {
      nodes.push(current);
    }

    nodesRef.current = nodes;
  };

  const highlight = (charIndex) => {
    let count = 0;

    for (let node of nodesRef.current) {
      const length = node.textContent.length;

      if (charIndex >= count && charIndex <= count + length) {
        const offset = charIndex - count;

        const range = document.createRange();
        range.setStart(node, offset);
        range.setEnd(node, offset + 1);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        const rect = range.getBoundingClientRect();

        window.scrollTo({
          top: rect.top + window.scrollY - 200,
          behavior: "smooth",
        });

        break;
      }

      count += length;
    }
  };

  const startReading = () => {
    const container = containerRef.current;

    collectTextNodes(container);

    const text = nodesRef.current.map((n) => n.textContent).join(" ");

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 0.9;

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        highlight(event.charIndex);
      }
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return {
    startReading,
    stop: () => speechSynthesis.cancel(),
    pause: () => speechSynthesis.pause(),
    resume: () => speechSynthesis.resume(),
  };
}