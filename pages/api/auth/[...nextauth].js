import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";

const options = {
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        try {
          const client = await MongoClient.connect(
            process.env.NEXT_PUBLIC_MONGODB_KEY
          );
          const db = client.db();
          const result = await db
            .collection("users")
            .findOne({
              username: credentials.username,
              password: credentials.password,
              type: "A",
            });

          client.close();
          if (result) {
            delete result.password
            return result;
          } else {
            throw new Error("No user found!");
          }
        } catch (error) {
          console.log("DB_ERROR", error.message);
          throw new Error("No user found!");
        }
      },
    }),
  ],
};

export default NextAuth(options);
