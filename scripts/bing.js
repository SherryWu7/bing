const request = require("axios");

const bingAPI = "http://www.bing.com/HPImageArchive.aspx";
const headers = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
};

module.exports = {
  fetchPicture: () => {
    const params = {
      idx: 0, // ids是按更新时间降序,  idx 升序
      n: 1,
      format: "js",
    };
    return request({
      url: bingAPI,
      method: "GET",
      headers,
      params,
    }).then(({ data }) => {
      const { images } = data;
      return {
        // data: images[0],
        data: images,
      };
    });
  },
};
