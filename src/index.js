const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3200;
const route = require("./routes/v1/routes");
const swaggerDocs = require("./utils/swagger");

app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1", route);

swaggerDocs(app);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;