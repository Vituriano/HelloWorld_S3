require('dotenv').config();

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const uploadFile = async (name, type, buffer) => {
    let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${name}.${type}`,
        Body: buffer,
        ACL: 'public-read',
    };

    const result = await new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        s3.upload(params, (error, _data) => {
            if (error) return reject(error);
            return resolve(`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${name}.${type}`);
        });
    });

    return result;
};

const deleteFile = async (name, type) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${name}.${type}`,
    };

    const result = await new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        s3.deleteObject(params, (error, _data) => {
            if (error) return reject((error));
            return resolve('Successfully deleted file');
        });
    });

    return result;
};

module.exports = {
    uploadFile,
    deleteFile,
};
