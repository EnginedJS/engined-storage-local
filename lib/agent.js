const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const events = require('events');
const progress = require('progress-stream');

module.exports = class Agent {

	constructor(opts) {
		this.updateInterval = opts.updateInterval || 1000;
		this.storagePath = opts.storagePath || process.cwd();
		this.externalUrl = opts.externalUrl || 'http://localhost';
	}

	save(stream, filename, size) {

		let filePath = path.join(this.storagePath, filename);
		let task = new events.EventEmitter();

		fse.ensureDir(this.storagePath).then(() => {

			// Create file
			let writeStream = fs.createWriteStream(filePath);

			writeStream.on('finish', () => {
				task.emit('complete', this.externalUrl + '/' + filename);
			});

			// Initial progress stream
			let prog = progress({
				length: size || 0,
				time: 1000
			});

			prog.on('progress', (progress) => {
				task.emit('progress', {
					percentage: progress.percentage,
					totalSize: progress.length,
					transferred: progress.transferred
				});
			});

			// Starting to write data
			stream
				.pipe(prog)
				.pipe(writeStream);
		});

		return task;
	}
};
