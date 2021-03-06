const multer = require('multer');

module.exports = multer({
	//   storage: multer.diskStorage({
	//     destination: function (req, file, cb) {
	//       cb(null, './uploads');
	//     },
	//     filename: function (req, file, cb) {
	//       cb(
	//         null,
	//         file.fieldname + '-' + new Date().toISOString().replace(/:/g, '-')
	//       );
	//     },
	//   }),
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
			cb(new Error('File is not supported'), false);
			return;
		}

		cb(null, true);
	},
});
