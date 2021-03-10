// server.js
const express = require('express');
const next = require('next')
const dbContent = require('../utils/dbConnect');
const addPerson = require('../api/add-person');
const updatePerson = require('../api/update-person');
const Persons = require('../api/persons');
const updatePersonId = require('../api/update-person-id');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev })
const handle = app.getRequestHandler()

dbContent().then(()=>{
    app.prepare().then(() => {

        const app = express()

        app.use((req,res,next)=>{

            //设置允许跨域的域名，*代表允许任意域名跨域
            res.header("Access-Control-Allow-Origin","*");
            //允许的header类型
            res.header("Access-Control-Allow-Headers","content-type");
            //跨域允许的请求方式
            res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

            next();
        })

        app.use(express.json()) // for parsing application/json
        app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

        app.post('/api/add-person', addPerson);
        app.post('/api/update-person', updatePerson);
        app.get('/api/persons',Persons);
        app.post('/api/update-person-id',updatePersonId);

        app.all('*', (req, res) => {
            return handle(req, res)
        })

        app.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
})