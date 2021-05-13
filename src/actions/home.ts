import request from "@/lib/request";

export const fetchPictures = (data?) => {
  return request({
    url: "/getPictures",
    options: {
      method: "GET",
      params: data,
    },
  });
};

export const fetchPictureDetail = (data?) => {
  return request({
    url: "/getPictureDetailById",
    options: {
      method: "GET",
      params: data,
    },
  });
};

export const fetchStory = (data) => {
  return request({
    url: "/story",
    options: {
      method: "GET",
      params: data,
    },
  });
};
