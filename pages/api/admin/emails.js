import { MongoClient } from "mongodb";

export default async function emails(req, res) {
  try {
    let { search } = req.query;

    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_KEY
    );
    const db = client.db();
    const conditions = search ? {email: new RegExp('.*' + search + '.*')}: {};

    const result = await db
      .collection("emails")
      .find(conditions)
      .sort({ date: -1 })
      .toArray();

    client.close();
    res.status(200).json({ status: "Ok", data: result });
  } catch (error) {
    console.log("DB_ERROR", error.message);
    res.status(400).json({ status: "Error", data: error.message });
  }
}
