const path = require('path');
const aws = require('aws-sdk')
const multer = require('multer');
const multerS3 = require('multer-s3');
const crypto = require('crypto');

const s3 = multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (error, hash) => {
                if (error) cb(error);
                const filename = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, filename);
            })
        },
    })


exports.singleImage = multer({
    //Determina o destino da imagem
    dest: path.resolve(__dirname, '..', '..', 'uploads', 'images'),
    storage: s3,
    //Determina o limite de tamanho da imagem
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    //Determina os tipos possíveis da imagem
    fileFilter: (request, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error("Tipo de arquivo inválido!"));
        }
    }
}).single("file")