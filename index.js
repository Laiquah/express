const express = require('express')
const path = require('path')
const app  = express()
const db = require('./config')
const bodyParser = require('body-parser')
const port = +process.env.PORT || 3000

//if we set extended to be true, that means we are using a stringify library or module called qs. if we set extended to be false, that means we are using querystring: /users/?firstName = Laiquah
// app.use(express.urlencoded((extended: false)))

//static file
app.use(express.static('./static'))
//if you want to register middleware you must use app.use.

// app.get('/', (req, res)=> {
//     res.status(200).sendFile()
// })
app.get('/users', (req, res)=> {
    const query = `SELECT userID, firstName, lastName FROM Users;`
    db.query(query, (err, data)=> {
        if(!err) {
            res.status(200).json(
                {
                    results: data
                }
            )
        }
        res.status(404).json(
            {
                msg: "An error occured."
            }
        )
    })
})

app.delete('/users/:userID', (req, res)=> {
    const query = `DELETE userID, firstName, lastName FROM users WHERE userID = 2;`
    db.query(query, (err, data)=> {
        if(!err) {
            res.status(200).json(
                {
                    results: data
                }
            )
        }
        res.status(404).json(
            {
                msg: "An error occured."
            }
        )
    })
})

app.get('/',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname, './static/html/index.html'))
    // res.status(200).json(
    //     {
    //         msg:"You're Home"
    //     }
    // )
})

app.get('/about',(req,res)=>{
    res.status(200).json(
        {
            msg:"About Page"
        }
    )
})

app.post("/register", bodyParser.json(), (req, res) => {
    const query = `
      INSERT INTO Users SET ?;
    `;
    db.query(query, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Registration was successful."
      });
    });
  });

// app.all('*', (req, res)=>{
//     res.json({
//         status: res.statusCode,
//         msg : 'An error occured'
//     })
// })

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

//retrieve a single user
app.get('/user/:id', (req, res)=>{
    const query = `
    SELECT userID, firstName, lastName
    FROM users
    WHERE userID = ${req.params.id};
    `

    db.query(query, (err, data)=>{
        if(err) throw(err)
        res.json(
            {
                status: res.statusCode,
                results: data
            }
        )
    })
})

//Put => Update
app.put('/user/:id', bodyParser.json(), (req, res)=> {
    const query = `
    UPDATE Users SET ?
    WHERE userID = ?;
    `

    db.query(query, [req.body, req.params.id], (err)=>{
        if (err) throw err
        res.json(
            {
                status: res.statusCode,
                msg:"The user record is updated."
            }
        )
    })
})

//Patch 
app.patch('/user/:id', bodyParser.json(), (req, res)=> {
    const query = `
    UPDATE Users SET ?
    WHERE userID = ?;
    `

    db.query(query, [req.body, req.params.id], (err)=>{
        if (err) throw err
        res.json(
            {
                status: res.statusCode,
                msg:"The user record is updated."
            }
        )
    })
})

//delete a new record
app.delete('/user/:id', (req, res)=>{
    const query = `
    DELETE FROM Users
    WHERE userID = ${req.params.id};
    `

    db.query(query, (err)=>{
        if (err) throw err;
        res.json(
            {
                status: res.statusCode,
                msg: "The user record has been deleted."
            }
        )
    })
})

//register a user
app.post('/register', bodyParser.json(), (req, res) => {
    const query = `
      INSERT INTO Users SET ?;
    `;
    db.query(query, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Registration was successful.",
      });
    })
  })