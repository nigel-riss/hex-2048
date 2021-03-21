const postData = async (url = ``, data = []) => {
  const response = await fetch(url, {
    method: `POST`,
    cache: `no-cache`,
    headers: {
      'Content-Type': `application/json`,
    },
    body: JSON.stringify(data)
  });

  return await response.json();
};


export {postData};
