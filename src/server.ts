import app from "./app";

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} in ${DATABASE}`);
});