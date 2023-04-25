import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://new_user:OHK7FSToajKnweHe@cluster0.t8st3rc.mongodb.net/test"
    ); // meetup
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted successfully" });
  }
}
export default handler;
