class FramerApi {
	constructor() {
		this.name = 'framerApi';
		this.displayName = 'Framer API';
		this.documentationUrl = 'https://www.framer.com/developers/server-api-quick-start';
		this.properties = [
			{
				displayName: 'Framer URL',
				name: 'framerUrl',
				type: 'string',
				default: '',
				placeholder: 'https://framer.com/projects/<id>',
				required: true,
				description: 'Framer project URL or ID used by framer-api connect()',
			},
			{
				displayName: 'Framer API Key',
				name: 'apiKey',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				required: true,
				description: 'Server API key from Framer',
			},
		];
	}
}

module.exports = { FramerApi };
