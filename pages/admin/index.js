import { getSession } from "next-auth/client";
import SmartTable from "react-next-table";

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

  return (
    <div>
      <SmartTable
        title={"Emails"}
        // data={[]}
      url="https://www.simplecode.app/api/admin/emails"
        headCells={headCells}
      />
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

  return {
    props: {
      session,
    },
  };
}
