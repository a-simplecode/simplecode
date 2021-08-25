import { MongoClient } from "mongodb";

export default async function emails(req, res) {
  try {
    let { search } = req.query;
    let conditions = {};

    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_KEY
    );
    const db = client.db();
    if (search) {
      const regex = new RegExp(".*" + search + ".*");
      conditions = {
        $or: [
          { email: regex },
          { name: regex },
          { phone: regex },
          { subject: regex },
          { message: regex },
        ],
      };
    }

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
