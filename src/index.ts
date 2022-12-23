import app from "./app";
import './db';

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log(`Listen in http://localhost:${PORT}/`);
});