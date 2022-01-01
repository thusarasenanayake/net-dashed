function getJSON(url, options = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

function postJSON(url, options = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

function validateData(data) {
  if (data.status === 'fail' || data.status === 'error') {
    return false;
  } else return true;
}

export { getJSON, postJSON, validateData };
