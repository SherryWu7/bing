const qiniu = require("qiniu");
export const BING_URL = "https://cn.bing.com";
const mac = new qiniu.auth.digest.Mac(
  process.env.QINIU_ACCESSKEY,
  process.env.QINIU_SECRETKEY
);
const config = new qiniu.conf.Config();
const manager = new qiniu.rs.BucketManager(mac, config);

export async function fetchToQiniu(url, cb) {
  try {
    const imgUrl = BING_URL + url;
    // const imgName = `images/${filename}_1920x1080`;
    //    const {} = await manager.fetch(imgUrl, process.env.QINIU_BUCKET, imgName, (err, ret) => {
    //       if (!err) {
    //         console.log("图片上传七牛成功:", ret);
    //         cb(ret.key);
    //       } else {
    //         console.log("图片上传七牛失败:", err);
    //       }
    //     });
  } catch (e) {
    throw Error(e.message);
  }
}
