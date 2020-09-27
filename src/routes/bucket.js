const router = require('express').Router();
const upload = require('../utils/multer');
const { bucketController } = require('../controllers');

router.route('/api/bucket/download')
  .get(bucketController.download);

router.route('/api/bucket/remove')
  .delete(bucketController.remove);

router.route('/api/bucket/upload')
  .post(upload, bucketController.upload);

module.exports = router;
