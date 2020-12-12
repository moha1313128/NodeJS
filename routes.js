const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>localhost</title></head>");
    res.write(
      `<body>
      <form action='/message' method='POST'>
      <input name='message' type='text'/>
      <button type='submit'>Send</button>
      </form>
      </body>`
    );
    res.write("</html>");
    return res.end();
  }
  // console.log(req.url, req.mehod, req.headers);
  // process.exit();
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      // fs.writeFileSync("message.txt", message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
    // fs.writeFileSync("message.txt", "DUMMY");
    // res.statusCode = 302;
    // res.setHeader("Location", "/");
    // return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>message</title></head>");
  res.write("<body><h1>Welcome</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
module.exports = {
  handler: requestHandler,
  //   someText: "hard code text",
};
// module.exports.handler = requestHandler;
// module.exports.someText = "hard coded text";
