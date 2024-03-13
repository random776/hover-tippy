import Tippy from "@tippyjs/react"; // ホバーすると出てくるやつ
import "tippy.js/dist/tippy.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown"; // markdownからreactnodeへ変換（パース）するもの。
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math"; // 数式の表示を可能とするものたち。
import "katex/dist/katex.min.css";

export default function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("./markdown/test.md") // markdownのデータを取得
      .then((response) => response.text()) // Extract text from response
      .then((data) => setText(data)) // Set text state
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Tippy
        content={ // markdown -> reactnode
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

