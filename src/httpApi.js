import selfUrl from "@gourmet/self-url";

export function send(gmctx, url, options) {
  url = selfUrl(gmctx, url);
  return fetch(url, options).then(res => {
    if (res.status !== 200) {
      const err = new Error("Fetch error: " + res.statusText);
      err.statusCode = res.status;
      throw err;
    }
    return res.json();
  });
}

export function get(gmctx, url) {
  return send(gmctx, url);
}

export function post(gmctx, url, body) {
  return send(gmctx, url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });
}
