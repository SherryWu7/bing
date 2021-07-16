const path = require('path');
const envPath = path.resolve(process.cwd(), '.env.local');
require('dotenv').config({ path: envPath });

const schedule = require('node-schedule');
const qiniu = require('./qiuniu');
const bing = require('./bing');
const db = require('./db');

// 每天 凌晨 定时获取必应最新壁纸
schedule.scheduleJob('0 0 0 * * *', async () => {
  console.log('定时器启动了', new Date());
  try {
    // const data = [
    //   '/th?id=OHR.PortuairkBay_ZH-CN5255529820_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
    //   '/th?id=OHR.ShyFive_ZH-CN0542113860_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
    //   '/th?id=OHR.WakatobiNP_ZH-CN0672859436_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
    //   '/th?id=OHR.LakeSchreckseeBY_ZH-CN0786328970_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
    // ];
    // data.map((url) => {
    //   qiniu.fetchToQiniu(url, async (images) => {});
    // });
    // "【端午安康】 （ © \tShutterstock ）".split("【端午安康】 （ © \tShutterstock ）".match('.*?(?= (\\()|(\\（))')[0])[1].match('\\（(.+?)\\）')
    const { data } = await bing.fetchPicture();
    data.map(({ copyright, copyrightlink, enddate, url }) => {
      const copyright2 = copyright.replace('（', '(').replace('）', ')');
      const result = copyright2.match('.*?(?= \\()')[0]; // '.*?(?= \\()':获取' ('之前的内容
      const author = copyright2.split(result)[1].match('\\((.+?)\\)')[1];
      const arr = result.split('，');
      qiniu.fetchToQiniu(url, async (images) => {
        console.log('插入数据库图片:', images);
        const sql = `INSERT INTO pictures(title,copyright,copyrightlink,bingurl,author,country,datetime,qiniuurl,thumbnail)
        VALUES ('${arr[0]}','${copyright}','${copyrightlink}','${url}','${author}','${arr[1] || ''}','${enddate}','${images[0]}','${images[1]}')`;
        const results = await db.query(sql);
        console.log(results);
      });
    });
  } catch (error) {
    throw Error(error.message);
  }
});
