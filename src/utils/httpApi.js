export function send(url, options) {
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

export function get(url) {
  return send(url, {
    headers: {
      "accept": "application/json"
    }
  });
}

export function post(url, body) {
  return send(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(body)
  });
}
