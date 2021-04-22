const express = require("express");
const morgan = require("morgan");

// Create express instance
const app = express();

//Body Parser
app.use(express.json());

//Morgan
app.use(morgan("tiny"));

// Require API routes
const user = require("./routes/auth");

// Import API Routes
app.use(user);

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
