export const headerAndReq = (statusCode, objForRes) => {
  res.writeHead(statusCode, { "Content-type": "application/json" });
  res.end(JSON.stringify(objForRes));
};
