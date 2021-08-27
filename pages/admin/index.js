import { getSession } from "next-auth/client";
import SmartTable from "../../components/SmartTable";
import dynamic from "next/dynamic";
import { getSpecificMarkdown } from "../../helpers/smartTabe-markdown";
import Image from "next/image";
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs//styles/prism";

export default function Home(props) {
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
    // img(image) {
    //   return (
    //     <Image
    //       src={image.src}
    //       alt={image.alt}
    //       width={274}
    //       height={150}
    //     />
    //   );
    // },

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
      const { children, className } = code;
      return (
        <div className="col-12 p-3">
          <h2>{className === "language-js" ? "Javascript" : "CSS"}</h2>
          <SyntaxHighlighter style={atomDark} language={className === "language-js" ?"javascript" : "css"}>
            {children}
          </SyntaxHighlighter>
        </div>
      );
    },
  };
  return (
    <div>
      {/* <SmartTable
        title={"Emails"}
        url="/api/admin/emails"
        headCells={headCells}
        searchDebounceTime={800}
      /> */}
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

  return {
    props: {
      session,
      tableMarkdown: tableMarkdown,
    },
  };
}
