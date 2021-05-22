const jwt = require('jsonwebtoken');

module.exports = function(req, next, userid) {
  const decodedUserid = jwt.verify(userid, process.env.ACCESS_TOKEN_SECRET).id;
  console.log(decodedUserid);
  req.body.userid = decodedUserid;
  next();
};
