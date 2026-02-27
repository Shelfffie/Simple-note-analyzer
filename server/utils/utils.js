export const headerAndReq = (res, statusCode, objForRes) => {
  res.writeHead(statusCode, { "Content-type": "application/json" });
  res.end(JSON.stringify(objForRes));
};
