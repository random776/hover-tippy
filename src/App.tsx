import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

export default function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("markdown/test.md")
      .then((response) => response.text()) // Extract text from response
      .then((data) => setText(data)) // Set text state
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Tippy
        content={
          <Markdown rehypePlugins={[rehypeKatex]} remarkPlugins={[remarkMath]}>
            {text}
          </Markdown>
        }
      >
        <p>ut.code();Learn</p>
      </Tippy>
    </>
  );
}

