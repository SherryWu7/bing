const path = require("path");
const envPath = path.resolve(process.cwd(), ".env.local");
require("dotenv").config({ path: envPath });

const schedule = require("node-schedule");
const qiniu = require("./qiuniu");
const bing = require("./bing");
const db = require("./db");

// 每天 凌晨 定时获取必应最新壁纸
schedule.scheduleJob("0 0 0 * * *", async () => {
  console.log("定时器启动了", new Date());
  try {
    const { data } = await bing.fetchPicture();
    data.map(({ copyright, copyrightlink, enddate, url }) => {
      const result = copyright.match(".*?(?= \\()")[0];
      const author = copyright.split(result)[1].match(/\(([^)]*)\)/)[1];
      const arr = result.split("，");
      qiniu.fetchToQiniu(url, async (images) => {
        console.log("插入数据库图片:", images);
        const sql = `INSERT INTO pictures(title,copyright,copyrightlink,bingurl,author,country,datetime,qiniuurl,thumbnail)
        VALUES ('${
          arr[0]
        }','${copyright}','${copyrightlink}','${url}','${author}','${
          arr[1]
        }','${enddate}','${images[0]}','${images[1]}')`;
        const results = await db.query(sql);
        console.log(results);
      });
    });
  } catch (error) {
    throw Error(error.message);
  }
});
