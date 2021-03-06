const express = require('express');
const morgan = require('morgan');

// Create express instance
const app = express();

//Body Parser
app.use(express.json());

//Morgan
app.use(morgan('tiny'));

//Middlewars
const decodeJWT = require('./middlewars/decodeJWT');
app.use((req, res, next) => {
  const userid = req.body?.userid || req.query?.userid;
  if (userid) decodeJWT(req, next, userid);
  else next();
});

// Require API routes
const routes = require('./routes/index');

// Import API Routes
app.use(routes);

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
