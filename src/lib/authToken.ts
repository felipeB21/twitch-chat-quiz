export const getAccessToken = async () => {
  const token = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${
      process.env.TWITCH_CLIENT_ID as string
    }&client_secret=${
      process.env.TWITCH_CLIENT_SECRET as string
    }&grant_type=client_credentials`,
    {
      method: "POST",
    }
  );

  const res = await token.json();
  return res.access_token;
};
