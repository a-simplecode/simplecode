const sgMail = require("@sendgrid/mail");
import { MongoClient } from "mongodb";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default async function email(req, res) {
  const body = JSON.parse(req.body);

  try {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_KEY);
    const db = client.db();
    const result = await db
      .collection("emails")
      .insertOne({ ...body, date: dayjs().format("YYYY-MM-DD HH:mm:ss") });
    client.close();
  
  } catch (error) {
    console.log("DB_ERROR",error.message)
  }

  sgMail.setApiKey(process.env.NEXT_PUBLIC_EMAIL_KEY);
  const msg = {
    to: "amineamine.dev@gmail.com",
    from: "aamine@bright-lab.com",
    subject: `Email from ${body.name} <?${body.email}>`,
    text: body.subject,
    html: `<p><h3>${body.subject}</h3> ${body.message}</p>`,
  };
  sgMail //to me
    .send(msg)
    .then(() => {
      const msg = {
        to: body.email,
        from: "aamine@bright-lab.com",
        subject: `Welcome to Amine Portfolio`,
        text: body.subject,
        html: `<p>
        <div>Dear ${body.name.split(" ")[0]}, </div>
        <br></br>
        <br></br>
        <div>Thank you for getting in touch with me.</div>
        <div>I will get back to you as soon as possible.</div>
        <br></br>
        <br></br>
        Kind Regards,
        <br></br>
        Amine.
        </p>`,
      };

      sgMail // to the user
        .send(msg)
        .then(() => {
          res.status(200).json({ status: "Ok" });
        })
        .catch((error) => {
          console.error(error);
          res.status(400).json({ status: "Second Email failed" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ status: "First Email failed" });
    });
}
