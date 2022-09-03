const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const userRouter = require("./routes/User.Routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("database"));

app.get("/", (req, res) => {
  res.status(200);
  res.send({
    status: 1,
    message: "Random User Server is Running",
  });
});

app.use("/user", userRouter);

// Error Handling
app.use(async (req, res, next) => {
  next({
    status: 404,
    message: "Page Not Found",
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () =>
  console.log(`Random User Server is Running on http://localhost:${PORT}`)
);
