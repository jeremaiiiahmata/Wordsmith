import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
const port = 3000; 

let blogData = [];
let nextID = 0;

const logArray = (req, res, next) => {
    console.table(blogData);
    next();
}

app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("tiny"));
app.use(logArray);

app.post("/submit", (req, res) => {

    nextID++;

    const data = {
        id : nextID,
        title : req.body['title'], 
        author : req.body['author'],
        content : req.body['content']
    }

    console.log(data);
    blogData.push(data);
    console.log("Data Added");

    console.table(blogData);
    res.redirect('/');
})

app.get("/blog/:id", (req, res) => {

    console.log(req.params.id);

    const ID = req.params.id;

    const {title, author, content} = blogData[ID-1];

    res.send(title);


})

app.get("/compose", (req, res) => {
    res.render("compose.ejs");
})

app.get("/", (req, res) => {
    res.render("index.ejs", { 
        data : blogData 
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})