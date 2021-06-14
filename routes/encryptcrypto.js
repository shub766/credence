const express = require('express')
const router = express.Router()
const crypto = require('crypto');
const NodeRSA = require('node-rsa');
var path = require("path");
var fs = require("fs");


router.post('/aesrsa', async(req,res) => {
    console.log(req.body.plainText);
    const text = req.body.plainText;
    try{
        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        function encrypt(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc',Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
        }
        var gfg = encrypt(text);
        // console.log(gfg);

        var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
            var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
            var publicKey = fs.readFileSync(absolutePath, "utf8");
            var buffer = Buffer.from(toEncrypt);
            var encrypted = crypto.publicEncrypt(publicKey, buffer);
            return encrypted.toString("base64");
        };

        console.log("rsaeskey",encryptStringWithRsaPublicKey(key,'C:/crypt/certificates/credence_public.key'))

        let hash = crypto
            .createHash('sha512')
            .update(gfg.encryptedData+key)
            .digest('hex');

        console.log(hash);

        obj = {
            "status":"success",
            "message":"Data encrypted",
            "encData": gfg.encryptedData, 
            "signature" : hash,
            "aesKey" : key.toString('hex'),
            "rsaAesKey" : encryptStringWithRsaPublicKey(key,'C:/crypt/certificates/credence_public.key')
        }
        res.json(obj)

    }catch(err){
        let er =  {
            "status":"success",
            "message":"Data encryption failed"
        }
        res.json(er)
    }
})

module.exports = router 