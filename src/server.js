import express from "express";

const app = express();

const PORT = "4000";

const hadleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT,hadleListening);
