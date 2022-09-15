import app from "./app.js";

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} in ${DATABASE}`);
});