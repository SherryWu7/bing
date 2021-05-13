import { NextApiHandler } from "next";
import { query } from "@/lib/db";

const handler: NextApiHandler = async (_, res) => {
  try {
    let id = null;
    if (typeof _.query.id === "string") {
      id = parseInt(_.query.id, 10);
    }
    const results = await query(`
    SELECT id, title, IFNULL(url,qiniuurl) url, thumbnail, DATE_FORMAT(datetime, '%Y-%m-%d') as datetime,copyrightlink,author,country,likes,downloads,views 
    FROM pictures 
    WHERE id=${id}`);
    return res.status(200).json({ data: results });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
