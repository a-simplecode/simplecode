import Markdown from "markdown-to-jsx";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
SyntaxHighlighter.registerLanguage("js", js);

import { getPackageREADME } from "../../helpers/markdown";
import { useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import SVGClipBoard from "../../components/icons/SVGClipboard";
import SVGCheck from "../../components/icons/SVGCheck";
import Exemple from "../../components/packagesExemples/react-next-table";

function MDCode(children, key, copied, setCopied) {
  return (
    <>
      <div className="col-12 text-end">
        {copied === key ? (
          <span>
            Copied <SVGCheck />
          </span>
        ) : (
          <CopyToClipboard text={children} onCopy={() => setCopied(key)}>
            <span className="pointer" title="Copy">
              <SVGClipBoard />
            </span>
          </CopyToClipboard>
        )}
      </div>
      <SyntaxHighlighter style={atomDark} language="javascript">
        {children}
      </SyntaxHighlighter>
    </>
  );
}

export default function PackageName(props) {
  const [copied, setCopied] = useState("");
  let key = 0;

  const markdownComponents = {
    a(href) {
      return (
        <a
          href={href.href}
          rel="noreferrer"
          target="_blank"
          className="pointer text-primary mx-1"
        >
          {href.children}
        </a>
      );
    },
    table(table) {
      return (
        <div className="my-5">
          <table>{table.children}</table>
        </div>
      );
    },
    p(paragraph) {
      return (
        <div className="col-12" style={{ textAlign: paragraph.align }}>
          {paragraph.children}
        </div>
      );
    },
    code(code) {
      const { className, children } = code;

      switch (className) {
        case "lang-javascript":
          key = key + 1;
          return MDCode(children, key, copied, setCopied);
        default:
          return children;
      }
    },
  };
  return (
    <div className="px-3">
      <div className="h2">Live Demo:</div>
      <Exemple data={props.data} />
      <Markdown options={{ overrides: markdownComponents }}>
        {props.packageREADME.content}
      </Markdown>
      <style global jsx>{`
        table,
        th,
        tr,
        td {
          border: 1px solid black;
          padding: 5px !important;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const packageName = ctx.query.packageName;
  const packageREADME = getPackageREADME(packageName);

  let data = [];
  try {
    const response = await fetch(
      "https://www.simplecode.app/api/packages/react-next-table?limit=5",
      {
        method: "get",
      }
    );
    let data_ = await response.json();
    data = data_.data.result
  } catch (error) {
    console.log("error", error.message);
  }

  return {
    props: {
      packageName,
      packageREADME,
      data,
    },
  };
}
