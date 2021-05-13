const bingAPI = "http://www.bing.com/HPImageArchive.aspx";
const cookie = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
};
export async function fetchPicture() {
  const params = {
    ids: 0,
    n: 1,
    format: "js",
  };
  const res = await fetch(bingAPI, {
    method: "GET",
    credentials: "include",
    headers: {
      ...cookie,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const json = await res.json();
  console.log(json);
}
