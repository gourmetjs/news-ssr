export default function httpApi(url, options) {
  options = {
    credentials: "same-origin",
    ...options,
    headers: {
      accept: "application/json",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      ...(options && options.headers)
    }
  };

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
