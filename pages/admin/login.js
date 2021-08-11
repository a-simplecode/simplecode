import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Button from "../../components/Button";

import styles from "../../styles/admin/login.module.css";

export default function Login() {
  const Router = useRouter();

  const Login = async (values) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (result.error) {
        throw new Error("Error");
      } else {
        toast.info(
          <div>
            <h3>Success</h3>Logged in successfully!
          </div>
        );
        Router.push("/admin");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        <div>
          <h3>Error</h3>Wrong username or password!
        </div>
      );
    }
  };

  return (
    <div className="container">
      <h1 className="mb-5 secondaryColor">
        <b>&lt;SimpleCode/&gt;</b>
      </h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await Login(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <Field
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
            />
            <ErrorMessage
              name="username"
              component="small"
              className="text-danger"
            />
            <Field
              type="text"
              name="password"
              className="form-control mt-3"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="small"
              className="text-danger"
            />
            <br></br>
            <Button
                title="reset"
                type="reset"
                color="btn-secondary"
                disabled={isSubmitting}
                className="mt-3 col-5"
              />

              <Button
                title="Submit"
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="mt-3 offset-2 col-5"
              />
          </Form>
        )}
      </Formik>
    </div>
  );
}

// load data SSR
export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });
  if (session)
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
