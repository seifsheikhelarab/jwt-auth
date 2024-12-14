//Importing needed NodeJS modules
require('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();

//Initializing Express
app.use(express.json());

//Simple array to store posts - can be replaced with a DB in real scenarios
const posts = [
    {
        username:"Ahmed",
        title:"Post 1"
    },
    {
        username:"Mohammed",
        title:"Post 2"
    }
]

//shows post if authenticated successfully
app.get('/posts', authenticateToken ,(req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});


//function used to verify and authenticate tokens
function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.sendStatus(401);

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
    next();
    })
}

//starts Express server
app.listen(process.env.APP_PORT || 3000, () => console.log(`Example app listening on port ${process.env.APP_PORT || 3000}!`));