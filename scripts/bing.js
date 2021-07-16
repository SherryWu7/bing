const request = require('axios');

const bingAPI = 'http://www.bing.com/HPImageArchive.aspx';
// https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&nc=1623291312448&pid=hp&FORM=BEHPTB&ensearch=1&quiz=1&og=1&IG=97D3CE92B0E547078A8B7769B4C95DBE&IID=SERP.1050
const headers = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
};

module.exports = {
  fetchPicture: () => {
    const params = {
      idx: 0,
      n: 1,
      format: 'js',
    };
    return request({
      url: bingAPI,
      method: 'GET',
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
