const express = require('express')
const router = express.Router()
const crypto = require('crypto');
const NodeRSA = require('node-rsa');
const path = require("path");
const fs = require("fs");
// const private_key = fs.readFile('..//models/author.js', "utf8");

// console.log(private_key)




router.post('/aesrsa', async(req,res) => {
    console.log(req.body.rsaAesKey)
    try{

        var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
            var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
            var privateKey = fs.readFileSync(absolutePath, "utf8");
            var buffer = Buffer.from(toDecrypt, "base64");
            var decrypted = crypto.privateDecrypt(privateKey, buffer);
            return decrypted.toString("utf8");
        };

        console.log("decrypt with private string",decryptStringWithRsaPrivateKey(req.body.rsaAesKey,'C:/crypt/certificates/credence.key'))

        let hash = crypto
            .createHash('sha512')
            .update(req.body.encData+decryptStringWithRsaPrivateKey(req.body.rsaAesKey,'C:/crypt/certificates/credence.key'))
            .digest('hex');

        console.log("hash",hash);

        if(!(hash==req.body.signature)){
            res.json({'message':'Digital Signature mismatched.'})
        }
        obj = {
            "status":"success",
            "message":"Data deecrypted",
            "encData": req.body.encData, 
            "signature" : hash,
            "aesKey" : decryptStringWithRsaPrivateKey(req.body.rsaAesKey,'C:/crypt/certificates/credence.key'),
            "rsaAesKey" : req.body.rsaAesKey
        }
        res.json(obj)
    }catch(err){
        let er =  {
            "status":"success",
            "message":"Data encryption failed"
        }
        res.json(er)
    }
    

    // crypto.randomBytes(16,(err,buf) =>{

    // });

    // let iv = crypto.randomBytes(16);
    // let keyone = "12345678123456781234567812345678"

    // let decipher = crypto.createDecipheriv('aes-256-cbc',keyone,iv);
    // let decrypted 8= decipher.update(req.body.encData,'hex','utf-8');
    // decrypted += decipher.final('utf-8');

    // console.log('decrypted',decrypted)


})

module.exports = router