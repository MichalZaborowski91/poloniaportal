export const verifyCaptcha = async (token) => {
  try {
    if (!token) {
      return false;
    }

    const res = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY,
        response: token,
      }),
    });
    if (!res.ok) return false;
    const data = await res.json();

    return data.success === true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
