import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../styles/GetInTouch.module.css";
import { toast } from 'react-toastify';

const Validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(values.phone)) {
    errors.phone = "Invalid phone number (ex: +96176466341)";
  }

  if (!values.name) errors.name = "Required";
  if (!values.subject) errors.subject = "Required";
  if (!values.message) errors.message = "Required";

  return errors;
};

export default function GetInTouch() {

  const submitEmail = async (values, setSubmitting) => {
    const result = await fetch("/api/email", {
      method: "post",
      body: JSON.stringify(values),
    });

    toast.info(<div><h3>Success</h3>Thank you for your message!</div>)

    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <h1 className="text-center">Let&apos;s Get In Touch</h1>
      <Formik
        initialValues={{
          email: "",
          name: "",
          phone: "",
          subject: "",
          message: "",
        }}
        validate={(values) => Validate(values)}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submitEmail(values, setSubmitting);
          resetForm({});
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col-12 col-md-6 mt-4">
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="form-control"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger small"
                />
              </div>

              <div className="col-12 col-md-6 mt-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger small"
                />
              </div>

              <div className="col-12 col-md-6 mt-4">
                <Field
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger small"
                />
              </div>

              <div className="col-12 col-md-6 mt-4">
                <Field
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="form-control"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-danger small"
                />
              </div>

              <div className="col-12 mt-4">
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Message"
                  className="form-control"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-danger small"
                />
              </div>
            </div>
            <div className="col-12 mt-4 text-center">
              <button
                className="btn btn-secondary me-2"
                type="reset"
                disabled={isSubmitting}
              >
                Reset
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
