const postData = async (url, size, data = []) => {
  const response = await fetch(`${url}/${size}`, {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};


export {postData};
