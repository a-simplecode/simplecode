import { getSession } from "next-auth/client";
import SmartTable from "../../components/SmartTable";
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

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

const headCells = [
  {
    id: "email",
    numeric: false,
    label: "Email",
    width: 200,
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
    width: 150,
  },
  {
    id: "phone",
    numeric: false,
    label: "Phone",
    width: 100,
  },
  {
    id: "subject",
    numeric: false,
    label: "Subject",
    width: 300,
  },
  {
    id: "message",
    numeric: false,
    label: "Message",
    width: 700,
  },
];

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
        case "language-js":
          return (
            <div className="col-12 p-3">
              <div className="row">
                <div className="col-10">
                  <h2>Javascript</h2>
                </div>
                <div className="col-2 text-end">
                  {copied === "language-js" ? (
                    <span>
                      Copied <SVGCheck />
                    </span>
                  ) : (
                    <CopyToClipboard
                      text={props.SmartTableJS}
                      onCopy={() => setCopied("language-js")}
                    >
                      <span className="pointer" title="Copy">
                        <SVGClipBoard />
                      </span>
                    </CopyToClipboard>
                  )}
                </div>
              </div>

              <div style={{ maxHeight: "400px", overflow: "scroll" }}>
                <SyntaxHighlighter style={atomDark} language="javascript">
                  {props.SmartTableJS}
                </SyntaxHighlighter>
              </div>
            </div>
          );

        case "language-css":
          return (
            <div className="col-12 p-3">
              <div className="row">
                <div className="col-10">
                  <h2>CSS</h2>
                </div>
                <div className="col-2 text-end">
                  {copied === "language-css" ? (
                    <span>
                      Copied <SVGCheck />
                    </span>
                  ) : (
                    <CopyToClipboard
                      text={props.SmartTableCSS}
                      onCopy={() => setCopied("language-css")}
                    >
                      <span className="pointer" title="Copy">
                        <SVGClipBoard />
                      </span>
                    </CopyToClipboard>
                  )}
                </div>
              </div>

              <div style={{ maxHeight: "400px", overflow: "scroll" }}>
                <SyntaxHighlighter style={atomDark} language="css">
                  {props.SmartTableCSS}
                </SyntaxHighlighter>
              </div>
            </div>
          );

        case "language-use":
          return (
            <div className="col-12 p-3">
              <div className="row">
                <div className="col-10">
                  <h2>Use</h2>
                </div>
                <div className="col-2 text-end">
                  {copied === "language-use" ? (
                    <span>
                      Copied <SVGCheck />
                    </span>
                  ) : (
                    <CopyToClipboard
                      text={`<SmartTable
                        title={"Emails"}
                        url="/api/admin/emails"
                        headCells={headCells}
                        searchDebounceTime={800}
                        // noPagination
                      />`}
                      onCopy={() => setCopied("language-use")}
                    >
                      <span className="pointer" title="Copy">
                        <SVGClipBoard />
                      </span>
                    </CopyToClipboard>
                  )}
                </div>
              </div>

              <div style={{ maxHeight: "400px", overflow: "scroll" }}>
                <SyntaxHighlighter style={atomDark} language="javascript">
                  {`<SmartTable
                    title={"Emails"}
                    url="/api/admin/emails"
                    headCells={headCells}
                    searchDebounceTime={800}
                    // noPagination
                  />`}
                </SyntaxHighlighter>
              </div>
            </div>
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

      <SmartTable
        title={"Emails"}
        url="/api/admin/emails"
        headCells={headCells}
        searchDebounceTime={800}
        // noPagination
      />
      <ReactMarkdown components={markdownComponents}>
        {props.tableMarkdown.content}
      </ReactMarkdown>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  // if (!session)
  //   return {
  //     redirect: {
  //       destination: "/admin/login",
  //       permanent: false,
  //     },
  //   };

  const tableMarkdown = getSpecificMarkdown("smartTable.md");
  const SmartTableJS = component("SmartTable/index.js");
  const SmartTableCSS = component("SmartTable/SmartTable.module.css");

  return {
    props: {
      session,
      tableMarkdown: tableMarkdown,
      SmartTableJS: SmartTableJS,
      SmartTableCSS: SmartTableCSS,
    },
  };
}
