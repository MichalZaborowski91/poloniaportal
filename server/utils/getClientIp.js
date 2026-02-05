export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  let ip = forwarded ? forwarded.split(",")[0].trim() : req.ip;

  //IPv6 localhost => IPv4
  if (ip === "::1") ip = "127.0.0.1";

  //::ffff:127.0.0.1 => 127.0.0.1
  if (ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  return ip;
}
