import { NextApiHandler } from "next";
import { query } from "@/lib/db";

const handler: NextApiHandler = async (_, res) => {
  try {
    const results = await query(`
    INSERT INTO pictures(title,copyright,bingUrl,url) 
    `);
    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
