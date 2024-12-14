//Importing needed NodeJS modules
require('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");

//Initializing Express
const app = express();
app.use(express.json());

//Simple array to store refresh tokens - can be replaced with a DB in real scenarios
let refreshTokens = [];

//Allows users to obtain a new access token using a refresh token.
app.post("/token", (req, res)=>{
    const refreshToken = req.body.token;
    if (refreshToken == null) res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

    jwt.verify(refreshToken,process.env.JWT_REFRESH, (err, user)=>{
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken({name: user.name});
        res.json({ accessToken:accessToken });
    })
})

//Logs out the user by invalidating their refresh token.
app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
  })


//Logs in the user and provides both an access token and a refresh token.
app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = {
    name: username
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user,process.env.JWT_REFRESH)
  res.json({accessToken : accessToken, refreshToken : refreshToken});
})


//generates access token to user
function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn : "15m"})
}

//starts Express server
app.listen(process.env.AUTH_PORT || 4000, () => console.log(`Example app listening on port ${process.env.AUTH_PORT || 4000}!`));