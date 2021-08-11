const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/dialogFlowRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
