export function checkStatus(response) {
  if (response.status < 200 || response.status >= 300) {
    throw Error(response.statusText);
  }
  return response;
}

export function parseJSON(response) {
  return response[response.status == 204 ? "text" : "json"]();
}

export function restGet(url, data) {
  if (data == undefined) {
    return fetch(url);
  } else {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}

export function restPost(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function restPut(url, data) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function restDelete(url, data) {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
