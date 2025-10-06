const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const PORT = 3000;

// Cấu hình EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// Cấu hình static
app.use("/public", express.static(path.join(__dirname, "public")));

// Trang chính
app.get("/", (req, res) => {
  res.render("index", { page: "Trang chủ" });
});

// Trang thư viện
app.get("/gallery", (req, res) => {
  res.render("gallery", { page: "Thư viện" });
});

// Trang giới thiệu
app.get("/about", (req, res) => {
  res.render("about", { page: "Giới thiệu" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
