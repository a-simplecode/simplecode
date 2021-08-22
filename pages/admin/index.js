import { getSession } from "next-auth/client";
import SmartTable from "../../components/SmartTable";

export default function Home(props) {
  const headCells = [
    {
      id: "email",
      numeric: false,
      label: "Email",
      width: "200px",
    },
    {
      id: "name",
      numeric: false,
      label: "Name",
      width: "100px",
    },
    {
      id: "phone",
      numeric: false,
      label: "Phone",
      width: "80px",
    },
    {
      id: "subject",
      numeric: false,
      label: "Subject",
      width: "300px",
    },
    {
      id: "message",
      numeric: false,
      label: "Message",
      width: "300px",
    },
  ];

  return (
    <div>
      <SmartTable title={"Emails"} url="/api/admin/emails" headCells={headCells} searchDebounceTime={800}/>
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
      session
    },
  };
}
