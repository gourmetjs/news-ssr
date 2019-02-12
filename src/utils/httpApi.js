import selfUrl from "@gourmet/self-url";

export function send(gmctx, url, options) {
  url = selfUrl(gmctx, url);

  if (gmctx.isServer) {
    // copy the "cookie" header from the original request
    options = {
      ...options,
      headers: {
        ...options.headers,
        cookie: gmctx.reqArgs.headers.cookie
      }
    };
  } else {
    options = {
      ...options,
      credentials: "same-origin"
    };
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

export function get(gmctx, url) {
  return send(gmctx, url, {
    headers: {
      "accept": "application/json"
    }
  });
}

export function post(gmctx, url, body) {
  return send(gmctx, url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(body)
  });
}
