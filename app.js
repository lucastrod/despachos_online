import express from "express";
import { viewsRouter } from "./routes/views.router.js";
import { packagesRouter } from "./routes/packages.router.js";
import { courierRouter } from "./routes/courier.router.js";
import path from "path";

//inicio y configuracion de express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//sirve archivos estaticos
app.use(express.static(path.join(import.meta.dirname, "public")));

//rutas
app.use("/app", viewsRouter);

app.use("/api/packages", packagesRouter);

app.use("/api/courier", courierRouter);

/* app.use("/", (req, res) => {
  res.redirect("/app");
}); */

//ruta default
app.use((req, res) => {
  res.status(404).send("Page not found");
});

//iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
