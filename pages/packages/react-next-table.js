import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { component, getSpecificMarkdown } from "../../helpers/markdown";
import Image from "next/image";
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import SVGClipBoard from "../../components/icons/SVGClipboard";
import SVGCheck from "../../components/icons/SVGCheck";
import SmartTable from "../../components/SmartTable.js";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

const codeViewer = (title, copied, type, text, language, setCopied) => {
  return (
    <div className="col-12 p-3">
      <div className="row">
        <div className="col-10">
          <h2>{title}</h2>
        </div>
        <div className="col-2 text-end">
          {copied === type ? (
            <span>
              Copied <SVGCheck />
            </span>
          ) : (
            <CopyToClipboard text={text} onCopy={() => setCopied(type)}>
              <span className="pointer" title="Copy">
                <SVGClipBoard />
              </span>
            </CopyToClipboard>
          )}
        </div>
      </div>

      <div style={{ maxHeight: "400px", overflow: "scroll" }}>
        <SyntaxHighlighter style={atomDark} language={language}>
          {text}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default function SmartTablePage(props) {
  const [copied, setCopied] = useState("");

  const markdownComponents = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <Image
            src={image.properties.src}
            alt={image.properties.alt}
            width={274}
            height={150}
          />
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className } = code;

      switch (className) {

        case "language-use":
          return codeViewer(
            "Use",
            copied,
            "language-use",
            props.SmartTableExemple,
            "javascript",
            setCopied
          );
        default:
          return <></>;
      }
    },
  };
  return (
    <div>
      <div className="p-3">
        <h1>SmartTable Component</h1>
        <div>
          <p>
            The SmartTable is a react simple Component based on HTML, CSS,
            JavaScript, bootstrap.
          </p>
          <p>
            Used for fetching data from a defined <b>api</b> with an option of
            pagination and search. You can find also many useful options like
            sorting, selecting columns to show, custom render of cells, fully
            responsive on all devices, custom react title...
          </p>
        </div>
        <h1>Exemple</h1>
      </div>

      <SmartTable />
      <ReactMarkdown components={markdownComponents}>
        {props.tableMarkdown.content}
      </ReactMarkdown>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (!session)
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };

  const tableMarkdown = getSpecificMarkdown("smartTable.md");
  const SmartTableExemple = component("SmartTable.js");

  return {
    props: {
      session,
      tableMarkdown: tableMarkdown,
      SmartTableExemple: SmartTableExemple,
    },
  };
}
