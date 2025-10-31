const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

const verifyCaptcha = async (token, remoteIp) => {
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
  const params = new URLSearchParams();
  params.append("secret", RECAPTCHA_SECRET);
  params.append("response", token);
  params.append("remoteip", remoteIp);

  const googleRes = await fetch(verifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await googleRes.json();
  return data;
};

module.exports = { verifyCaptcha };