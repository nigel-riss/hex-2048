const postData = async (url, size, data = []) => {
  console.log(JSON.stringify(data));
  const response = await fetch(`${url}/${size}`, {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`,
    },
    // body: JSON.stringify(data),
    body: `[]`,
  });

  return await response.json();
};


export {postData};
