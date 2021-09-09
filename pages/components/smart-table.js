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

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

export default function SmartTablePage(props) {
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
      return (
        <div className="col-12 p-3">
          <h2>{className === "language-js" ? "Javascript" : "CSS"}</h2>
          <div style={{ maxHeight: "400px", overflow: "scroll" }}>
            <SyntaxHighlighter
              style={atomDark}
              language={className === "language-js" ? "javascript" : "css"}
            >
              {className === "language-js"
                ? props.SmartTableJS
                : props.SmartTableCSS}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    },
  };
  return (
    <div>
      <div className="p-3">
        <h1>SmartTable Component</h1>
        <p>
          The smart table is a react Components based on HTML, CSS, JavaScript,
          bootstrap.{" "}
        </p>

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

  if (!session)
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };

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
