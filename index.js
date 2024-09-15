import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
const port = 3000; 

app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})