import { MongoClient } from "mongodb";

export default async function emails(req, res) {
  try {
    let { search, page, limit } = req.query;
    let conditions = {};

    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_KEY
    );
    const db = client.db();
    if (search) {
      const regex = new RegExp(".*" + search + ".*", "i");
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

    if (page) page = parseInt(page, 10);
    if (limit) limit = parseInt(limit, 10);

    const total = await db.collection("emails").find(conditions).count();

    const result = await db
      .collection("emails")
      .find(conditions)
      .skip(total < limit ? 0 : page && limit ? (page - 1) * limit : 0)
      .limit(limit ?? 9999)
      .sort({ date: -1 })
      .toArray();

    client.close();
    res
      .status(200)
      .json({ status: "Ok", data: { result: result, total: total } });
  } catch (error) {
    console.log("DB_ERROR", error.message);
    res.status(400).json({ status: "Error", data: error.message });
  }
}
