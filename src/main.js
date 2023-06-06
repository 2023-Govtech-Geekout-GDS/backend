import cors from 'cors';
import express from "express";
import Router from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "../swagger.json" assert { type: "json" };

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(express.json());
app.use("/api", Router);
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

export default app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
});