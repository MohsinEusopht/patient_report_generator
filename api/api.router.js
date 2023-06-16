const router = require('express').Router();
const { validateApiPermission } = require('../permissions/api_permission');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/documents/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    },
})
const uploadFile = multer({ storage: storage });
const {
    storeFile,
    getFiles,
    LoadFile
} = require('./api.controller');

router.post('/store-file', [validateApiPermission, uploadFile.single('file')], storeFile);

router.get('/get-files', validateApiPermission, getFiles);

router.post('/load-file', validateApiPermission, LoadFile);

module.exports = router;