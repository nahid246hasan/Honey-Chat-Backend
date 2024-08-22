const path = require('path');
const multer = require('multer');


function uploader(
    subfolder_path, 
    allowed_file_types, 
    max_file_size, 
    error_msg
) {
    const UPLOAD_FOLDER=`${__dirname}/../assets/profilePhoto/${subfolder_path}/`;
    

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOAD_FOLDER)
        },
        filename: function (req, file, cb) {
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-');
            cb(null, fileName + '-' + Date.now() + fileExt);
        }
    }); 
    const upload = multer({
        storage: storage,
        limits: { fileSize: max_file_size },
        fileFilter: function (req, file, cb) {
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error(error_msg));
            }
        }
    });
    return upload;
}

module.exports = uploader;