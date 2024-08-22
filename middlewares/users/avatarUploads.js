const uploader = require('../../utilities/singleUploader');

function avatarUploads(req, res, next) {
    const upload= uploader(
        'avatars',
        ['image/jpeg', 'image/jpg', 'image/png'],
        5000000,
        'Only .jpg, .png or .jpeg format allowed!'
    );
    upload.any()(req, res, (err) => {
        if(err) {
            res.status(500).send(
                {
                    errors:{
                        avatar:{
                            msg: err.message
                        }
                    }
                }
            );
        } else {
            next();
        }
    });
}
module.exports = avatarUploads;