const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')

app.set("view engine", "ejs");;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));




app.get('/', (req, res) => {

          fs.readdir(`./hisaab`, (err, files) => {
                    if (err) return res.status(500).send(err);
                    res.render('index', { files: files })

          })
});

app.get('/create', (req, res) => {
          res.render('create')
})

app.get("/hisaab/:filename", (req, res) => {
          fs.readFile(`./hisaab/${req.params.filename}`, 'utf-8', (err, filedata) => {
                    if (err) return res.status(500).send(err);
                    res.render('hisaab', { filedata, filename: req.params.filename })
          })

})
app.get("/delete/:filename", (req, res) => {
          fs.unlink(`./hisaab/${req.params.filename}`, (err) => {
                    if (err) return res.status(500).send(err);
                    res.redirect('/')
          })

})
app.post("/createhisaab", (req, res) => {
          let currentDate = new Date()
          let date = `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`

          fs.writeFile(`./hisaab/${date}.txt`, req.body.content, (err) => {
                    if (err) return res.status(500).send(err);
                    res.redirect('/')
          })
})

app.get('/edit/:filename', (req, res) => {
          fs.readFile(`./hisaab/${req.params.filename}`, "utf-8", (err, filedata) => {
                    if (err) return res.status(500).send(err)
                    res.render('edit', { filedata, filename: req.params.filename })
          })
})
app.post('/update/:filename', (req, res) => {
          fs.writeFile(`./hisaab/${req.params.filename}`, req.body.content, (err) => {
                    if (err) return res.status(500).send(err);
                    res.redirect('/')
          })
})


const port = 5000;

app.listen(port, () => {
          console.log(`Server is running on port ${port}`);

})