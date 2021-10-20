const randomPostGenerator = async () => {
  const postResp = await fetch(
    "https://random-data-api.com/api/hipster/random_hipster_stuff"
  );
  const post = await postResp.json();

  const data = {
    title: post.word,
    author: `@${post.words[0]}${post.words[1]}`,
    content: post.paragraph,
    timestamp: new Date(Date.now()),
  };
  return data;
};

export { randomPostGenerator };
