const express = require('express');
const path = require('path')
const fs = require('fs')
const app = express();
app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get('/', function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        console.log(files);
        res.render("index", { files: files });
    })

})
app.get('/file/:filename', function (req, res) {
   fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
       res.render('show',{filename:req.params.filename,filedata:filedata})
  })

});
app.post('/delete/:filename', function (req, res) {
    const filepath = `./files/${req.params.filename}`;
    fs.unlink(filepath, function (err) {
        if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).send("Error deleting file");
        }
        res.redirect('/');
    });
});

app.post('/delete/:filename', function (req, res) {
    const filepath = `./files/${req.params.filename}`;
    fs.unlink(filepath, function (err) {
        if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).send("Error deleting file");
        }
        res.redirect('/');
    });
});
app.get('/edit/:filename', function(req, res){
    fs.readdir(`./files`, function(err, files) {
        if (err) {
            return res.status(500).send('Error reading files');
        }
        res.render('edit', { filename: req.params.filename, files: files });
    });
});


app.post('/create', function (req, res) {
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.taskdetail,function(err){
   res.redirect('/');
  })

});

app.listen(3000);