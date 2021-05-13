const qiniu = require("qiniu");
const qs = require("qs");
const BING_URL = "https://cn.bing.com";

const resolutions = ["1920x1080", "400x240"];

const mac = new qiniu.auth.digest.Mac(
  process.env.QINIU_ACCESSKEY,
  process.env.QINIU_SECRETKEY
);

const config = new qiniu.conf.Config();
const manager = new qiniu.rs.BucketManager(mac, config);

const upload = (url, name) => {
  return new Promise((resolve, reject) => {
    manager.fetch(url, process.env.QINIU_BUCKET, name, (err, ret) => {
      if (!err) {
        resolve(ret.key);
        console.log("图片上传七牛成功:", ret);
      } else {
        reject();
        console.log("图片上传七牛失败:", err);
      }
    });
  });
};

module.exports = {
  fetchToQiniu: async (url, cb) => {
    try {
      let imgUrl = BING_URL + url;
      let images = [];
      for (let i = 0; i < resolutions.length; i++) {
        const _temp = resolutions[i];
        imgUrl = imgUrl.replace("1920x1080", _temp);
        let imgName = (
          qs.parse(imgUrl.split("?")[imgUrl.split("?").length - 1]) || {}
        ).id;
        imgName = `images/${imgName || url}`;
        const img = await upload(imgUrl, imgName);
        console.log("=====", img);
        images.push(img);
        // manager.fetch(imgUrl, process.env.QINIU_BUCKET, imgName, (err, ret) => {
        //   if (!err) {
        //     images.push(ret.key);
        //     console.log("图片上传七牛成功:", ret);
        //   } else {
        //     console.log("图片上传七牛失败:", err);
        //   }
        // });
      }
      cb(images);
    } catch (error) {
      throw Error(error.message);
    }
  },
};
