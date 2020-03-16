var express = require('express');
var router = express.Router();
const path = require('path');

/* GET media listing. */
router.get('/:name', function(req, res, next) {
  const rootPath = path.join(path.dirname(require.main.filename), '..');
  const options = {
    root: path.join(rootPath, process.env.MEDIA_PATH),
  };
  const filename = req.params.name;
  res.sendFile(filename, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('File sent: ', filename);
    }
  });
});

module.exports = router;
