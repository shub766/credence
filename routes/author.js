const express = require('express')
const router = express.Router()
const Author = require('..//models/author')
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');

    },
    filename: function(req,file,cb){
        cb(null,file.originalname);

    }
}); 

const upload = multer({storage:storage})

router.get('/', async(req,res) => {
    try{
        const author = await Author.find()
        res.json(author)

    }catch(err){
        res.send("Error"+err)
    }
})

router.post('/',upload.single('authorimage'), async(req,res) => {
    console.log(req.file);
    console.log(req)
    const author = new Author({
        name:req.body.name,
        authorimage:req.file.path,
        summary:req.body.summary
        
    })
    try{
        const a1 = await author.save()
        res.json(a1)

    }catch(err){
        res.send('Error')
    }
})

module.exports = router 