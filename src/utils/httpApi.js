import selfUrl from "@gourmet/self-url";

export default function httpApi(url, options, gmctx) {
  options = Object.assign({
    headers: {},
    credentials: "same-origin"
  }, options);
  options.headers.accept = "application/json";

  if (gmctx && gmctx.isServer) {
    // copy the "cookie" header from the original request
    url = selfUrl(gmctx, url);
    options.headers.cookie = gmctx.reqArgs.headers.cookie;
  }

  if (options.body) {
    options.body = JSON.stringify(options.body);
    options.headers["content-type"] = "application/json";
  }

  return fetch(url, options).then(res => {
    return res.json().then(data =>{
      if (res.status !== 200) {
        const obj = data.error || {};
        const err = new Error(obj.message || res.statusText);
        err.code = obj.code;
        err.statusCode = obj.statusCode || res.status;
        err.detail = obj.detail;
        throw err;
      }
      return data;
    });
  });
}
