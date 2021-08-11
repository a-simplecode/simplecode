import { MongoClient } from "mongodb";

export default async function email(req, res) {

  try {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_KEY);
    const db = client.db();
    const result = await db
      .collection("emails")
      .find().sort({date: -1}).toArray();
    client.close();

    console.log("amine", result)
  
  } catch (error) {
    console.log("DB_ERROR",error.message)
  }


}
