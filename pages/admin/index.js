import { getSession } from "next-auth/client";

export default function Home(props){
    return(
        <div>
            home
        </div>
    )
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

      let emails = [];
      try {
        emails = await fetch("/api/admin/emails", {
            method: "get"
          });
      } catch (e) {
         console.log("admin emails error: ", e.message)
      }

      console.log(emails)
    return {
      props: {
        session,
        emails
      },
    };
  }
