const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

async function verifyRecaptcha(token, ip) {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const params = new URLSearchParams();

  params.append("secret", RECAPTCHA_SECRET);
  params.append("response", token);
  params.append("remoteip", ip);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await response.json();
  return data;
}

module.exports = { verifyRecaptcha };
