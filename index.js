const { Service } = require('engined');
const Agent = require('./lib/agent');

module.exports = (opts = {}) => class extends Service {

	constructor(context) {
		super(context);

		this.dependencies = [
			'Storage'
		];
		this.agentName = opts.agentName;
		this.options = opts;
	}

	async start() {

		let storageManager = this.getContext().get('Storage');

		let agent = new Agent(this.options);

		storageManager.register(this.agentName, agent);
	}

	async stop() {

		let storageManager = this.getContext().get('Storage');

		storageManager.unregister(this.agentName);
	}
}
