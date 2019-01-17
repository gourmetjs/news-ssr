import selfUrl from "@gourmet/self-url";

function _fetch(gmctx, url, options) {
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

function _get(gmctx, url) {
  return _fetch(gmctx, url);
}

function _post(gmctx, url, body) {
  return _fetch(gmctx, url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body
  });
}

export function getNews(gmctx, {page}) {
  return _get(gmctx, `/api/news?page=${page}`);
}

export function getSaved(gmctx, {page}) {
  return _get(gmctx, `/api/saved?page=${page}`);
}

export function save(gmctx, {articles}) {
  return _post(gmctx, "/api/saved", {action: "save", articles});
}

export function unsave(gmctx, {ids}) {
  return _post(gmctx, "/api/saved", {action: "unsave", ids});
}
