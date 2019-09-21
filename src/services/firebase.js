const keyFilename = process.env.keyFilename;
const projectId = process.env.projectId;
const bucketName = process.env.bucketName;

const storage = require("@google-cloud/storage");

module.exports = {
	upload: function(blob) {
		const gcs = storage({
			projectId,
			keyFilename
		});
		const bucket = gcs.bucket(bucketName);
		bucket.upload(blob, function(err, file) {
			if (err) throw new Error(err);
		});
	}
};
