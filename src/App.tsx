import Tippy from "@tippyjs/react"; // ホバーすると出てくるやつ
import "tippy.js/dist/tippy.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown"; // markdownからreactnodeへ変換（パース）するもの。
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math"; // 数式の表示を可能とするものたち。
import "katex/dist/katex.min.css";
import TestMd from "/test.md?url";
import { mdModify } from "./utils/mdModify";
import Hoge from "/hoge.html?url";
import parse from "html-react-parser";

export default function App() {
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch(TestMd) // markdownのデータを取得
      .then((response) => response.text()) // Extract text from response
      .then((data) => setText(data)) // Set text state
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch(Hoge) // htmlのデータを取得
      .then((response) => response.text()) // Extract text from response
      .then((data) => setHtml(data)) // Set text state
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const primer = html.split("ut.code();Learn");
  const rep = primer.join("<p class='utcodeLearn'>ut.code();Learn</p>");

  const options = {
    replace({ attribs }: { attribs: any }) {
      if (!attribs) {
        return;
      }

      if (attribs.class === "utcodeLearn") {
        return (
          <Tippy
            content={
              <Markdown
                rehypePlugins={[rehypeKatex]}
                remarkPlugins={[remarkMath]}
              >
                {mdModify(text, "ut.code();Learn")}
              </Markdown>
            }
          >
            <span>ut.code();Learn</span>
          </Tippy>
        );
      }
    },
  };

  return (
    <>
      <p>{parse(rep, options)}</p>
    </>
  );
}
