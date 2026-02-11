let connectFn;

async function getConnect() {
	if (!connectFn) {
		const module = await import('framer-api');
		connectFn = module.connect;
	}
	return connectFn;
}

class Framer {
	constructor() {
		this.description = {
			displayName: 'Framer',
			name: 'framer',
			icon: 'file:framer.svg',
			group: ['transform'],
			version: 1,
			subtitle: '={{$parameter["operation"]}}',
			description: 'Execute Framer Server API requests',
			defaults: {
				name: 'Framer',
			},
			inputs: ['main'],
			outputs: ['main'],
			credentials: [
				{
					name: 'framerApi',
					required: true,
				},
			],
			properties: [
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					noDataExpression: true,
					options: [
						{
							name: 'Get Project Info',
							value: 'getProjectInfo',
							description: 'Get project details from Framer',
							action: 'Get Framer project info',
						},
						{
							name: 'Get Changed Paths',
							value: 'getChangedPaths',
							description: 'Get added, removed, and modified paths since last publish',
							action: 'Get Framer changed paths',
						},
						{
							name: 'Get Change Contributors',
							value: 'getChangeContributors',
							description: 'Get contributors who changed content between versions',
							action: 'Get Framer change contributors',
						},
						{
							name: 'Publish',
							value: 'publish',
							description: 'Publish a new Framer preview deployment',
							action: 'Publish Framer preview',
						},
						{
							name: 'Deploy',
							value: 'deploy',
							description: 'Promote a deployment to production',
							action: 'Deploy Framer deployment',
						},
						{
							name: 'Publish To Production',
							value: 'publishToProduction',
							description:
								'Create a preview deployment and immediately promote it to production',
							action: 'Publish and deploy Framer changes',
						},
						{
							name: 'Create Managed Collection',
							value: 'createManagedCollection',
							description: 'Create a managed collection in the project',
							action: 'Create Framer managed collection',
						},
						{
							name: 'Get Collections',
							value: 'getCollections',
							description: 'Get all collections in the project',
							action: 'Get Framer collections',
						},
						{
							name: 'Get Collection Items',
							value: 'getCollectionItems',
							description: 'Get all items for a collection',
							action: 'Get Framer collection items',
						},
						{
							name: 'Upsert Collection Items',
							value: 'upsertCollectionItems',
							description: 'Add or update collection items',
							action: 'Upsert Framer collection items',
						},
						{
							name: 'Remove Collection Items',
							value: 'removeCollectionItems',
							description: 'Remove collection items by ID',
							action: 'Remove Framer collection items',
						},
						{
							name: 'Setup Collection Fields',
							value: 'setupCollectionFields',
							description: 'Create collection fields from JSON definitions',
							action: 'Setup Framer collection fields',
						},
					],
					default: 'getProjectInfo',
				},
				{
					displayName: 'Use Custom Framer URL',
					name: 'useCustomUrl',
					type: 'boolean',
					default: false,
					description:
						'Whether to override the Framer URL from credentials for this node execution',
				},
				{
					displayName: 'Custom Framer URL',
					name: 'customFramerUrl',
					type: 'string',
					default: '',
					placeholder: 'https://your-site.framer.website',
					displayOptions: {
						show: {
							useCustomUrl: [true],
						},
					},
					description: 'Custom base URL for this execution only',
				},
				{
					displayName: 'From Version',
					name: 'fromVersion',
					type: 'number',
					default: 0,
					typeOptions: {
						minValue: 0,
					},
					displayOptions: {
						show: {
							operation: ['getChangeContributors'],
						},
					},
					description: 'Optional start version. Leave 0 to use default behavior',
				},
				{
					displayName: 'To Version',
					name: 'toVersion',
					type: 'number',
					default: 0,
					typeOptions: {
						minValue: 0,
					},
					displayOptions: {
						show: {
							operation: ['getChangeContributors'],
						},
					},
					description: 'Optional end version. Leave 0 to use default behavior',
				},
				{
					displayName: 'Deployment ID',
					name: 'deploymentId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['deploy'],
						},
					},
					description:
						'Deployment ID to promote to production (often from Publish output)',
				},
				{
					displayName: 'Collection ID',
					name: 'collectionId',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: [
								'getCollectionItems',
								'upsertCollectionItems',
								'removeCollectionItems',
								'setupCollectionFields',
							],
						},
					},
					description: 'ID of the target collection',
				},
				{
					displayName: 'Return Raw Item',
					name: 'returnRawItem',
					type: 'boolean',
					default: false,
					displayOptions: {
						show: {
							operation: ['getCollectionItems'],
						},
					},
					description:
						'Whether to return the full raw Framer item object instead of mapped fields',
				},
				{
					displayName: 'Items JSON',
					name: 'itemsJson',
					type: 'string',
					default: '[]',
					typeOptions: {
						rows: 8,
					},
					required: true,
					displayOptions: {
						show: {
							operation: ['upsertCollectionItems'],
						},
					},
					description:
						'JSON array of items for collection.addItems(). Include `id` to update existing items or omit it to create. Supports `draft: true` for unpublished items',
				},
				{
					displayName: 'Item IDs JSON',
					name: 'itemIdsJson',
					type: 'string',
					default: '[]',
					typeOptions: {
						rows: 6,
					},
					required: true,
					displayOptions: {
						show: {
							operation: ['removeCollectionItems'],
						},
					},
					description: 'JSON array of item IDs to remove',
				},
				{
					displayName: 'Fields JSON',
					name: 'fieldsJson',
					type: 'string',
					default:
						'[{"name":"title","type":"string"},{"name":"content","type":"formattedText"},{"name":"image","type":"image"},{"name":"category","type":"enum","cases":[{"name":"News"},{"name":"Tutorial"}]},{"name":"width","type":"number"},{"name":"height","type":"number"}]',
					typeOptions: {
						rows: 10,
					},
					required: true,
					displayOptions: {
						show: {
							operation: ['setupCollectionFields'],
						},
					},
					description:
						'JSON array for collection.addFields(). Example field types: string, formattedText, image, number, enum',
				},
				{
					displayName: 'Skip Existing Fields By Name',
					name: 'skipExistingFields',
					type: 'boolean',
					default: true,
					displayOptions: {
						show: {
							operation: ['setupCollectionFields'],
						},
					},
					description:
						'Whether to skip fields whose names already exist in the collection (case-insensitive)',
				},
				{
					displayName: 'Collection Name',
					name: 'collectionName',
					type: 'string',
					default: '',
					required: true,
					displayOptions: {
						show: {
							operation: ['createManagedCollection'],
						},
					},
					description: 'Name of the managed collection to create',
				},
			],
		};
	}

	async execute() {
		const items = this.getInputData();
		const returnData = [];
		const credentials = await this.getCredentials('framerApi');

		for (let i = 0; i < items.length; i++) {
			try {
				const useCustomUrl = this.getNodeParameter('useCustomUrl', i);
				const customFramerUrl = this.getNodeParameter('customFramerUrl', i, '');
				const operation = this.getNodeParameter('operation', i);

				const framerUrl = useCustomUrl ? customFramerUrl : credentials.framerUrl;
				const projectUrl = (framerUrl || '').trim();
				if (!projectUrl) {
					throw new Error('Framer URL is empty. Set it in credentials or custom URL');
				}

				if (!credentials.apiKey || !credentials.apiKey.trim()) {
					throw new Error('Framer API Key is empty in credentials');
				}

				const connect = await getConnect();
				const framer = await connect(projectUrl, credentials.apiKey);
				let result;
				try {
					if (operation === 'getProjectInfo') {
						result = await framer.getProjectInfo();
					}

					if (operation === 'getChangedPaths') {
						result = await framer.getChangedPaths();
					}

					if (operation === 'getChangeContributors') {
						const fromVersion = this.getNodeParameter('fromVersion', i);
						const toVersion = this.getNodeParameter('toVersion', i);

						const fromArg = fromVersion > 0 ? fromVersion : undefined;
						const toArg = toVersion > 0 ? toVersion : undefined;
						result = await framer.getChangeContributors(fromArg, toArg);
					}

					if (operation === 'publish') {
						result = await framer.publish();
					}

					if (operation === 'deploy') {
						const deploymentId = this.getNodeParameter('deploymentId', i);
						if (!deploymentId || !String(deploymentId).trim()) {
							throw new Error('Deployment ID is required for Deploy operation');
						}
						result = await framer.deploy(String(deploymentId));
					}

					if (operation === 'publishToProduction') {
						const publishResult = await framer.publish();
						const publishedDeploymentId =
							publishResult?.deployment && publishResult.deployment.id
								? String(publishResult.deployment.id)
								: '';

						if (!publishedDeploymentId) {
							throw new Error(
								'Publish did not return a deployment ID, cannot deploy to production',
							);
						}

						const deployResult = await framer.deploy(publishedDeploymentId);
						result = {
							publish: publishResult,
							deploy: deployResult,
						};
					}

					if (operation === 'createManagedCollection') {
						const collectionName = this.getNodeParameter('collectionName', i);
						if (!collectionName || !String(collectionName).trim()) {
							throw new Error(
								'Collection Name is required for Create Managed Collection operation',
							);
						}
						result = await framer.createManagedCollection(String(collectionName));
					}

					if (operation === 'getCollections') {
						const collections = await framer.getCollections();
						result = collections.map((collection) => ({
							id: collection.id,
							name: collection.name,
							managedBy: collection.managedBy,
						}));
					}

					if (operation === 'getCollectionItems') {
						const collectionId = this.getNodeParameter('collectionId', i);
						const returnRawItem = this.getNodeParameter('returnRawItem', i, false);
						if (!collectionId || !String(collectionId).trim()) {
							throw new Error('Collection ID is required for Get Collection Items operation');
						}

						const collection = await framer.getCollection(String(collectionId));
						if (!collection) {
							throw new Error(`Collection not found for ID: ${String(collectionId)}`);
						}

						const items = await collection.getItems();
						if (returnRawItem) {
							result = items.map((item) => ({ ...item }));
						} else {
							result = items.map((item) => ({
								id: item.id,
								slug: item.slug,
								draft: item.draft === true,
								fieldData: item.fieldData,
							}));
						}
					}

					if (operation === 'upsertCollectionItems') {
						const collectionId = this.getNodeParameter('collectionId', i);
						const itemsJson = this.getNodeParameter('itemsJson', i, '[]');

						if (!collectionId || !String(collectionId).trim()) {
							throw new Error('Collection ID is required for Upsert Collection Items operation');
						}

						const collection = await framer.getCollection(String(collectionId));
						if (!collection) {
							throw new Error(`Collection not found for ID: ${String(collectionId)}`);
						}

						let itemsPayload;
						try {
							itemsPayload = JSON.parse(String(itemsJson));
						} catch (parseError) {
							throw new Error(
								`Items JSON is invalid: ${parseError && parseError.message ? parseError.message : 'parse error'}`,
							);
						}

						if (!Array.isArray(itemsPayload)) {
							throw new Error('Items JSON must be a JSON array');
						}

						await collection.addItems(itemsPayload);
						result = {
							collectionId: String(collectionId),
							upsertedCount: itemsPayload.length,
						};
					}

					if (operation === 'removeCollectionItems') {
						const collectionId = this.getNodeParameter('collectionId', i);
						const itemIdsJson = this.getNodeParameter('itemIdsJson', i, '[]');

						if (!collectionId || !String(collectionId).trim()) {
							throw new Error('Collection ID is required for Remove Collection Items operation');
						}

						const collection = await framer.getCollection(String(collectionId));
						if (!collection) {
							throw new Error(`Collection not found for ID: ${String(collectionId)}`);
						}

						let itemIds;
						try {
							itemIds = JSON.parse(String(itemIdsJson));
						} catch (parseError) {
							throw new Error(
								`Item IDs JSON is invalid: ${parseError && parseError.message ? parseError.message : 'parse error'}`,
							);
						}

						if (!Array.isArray(itemIds)) {
							throw new Error('Item IDs JSON must be a JSON array of strings');
						}

						const normalizedItemIds = itemIds.map((id) => String(id));
						await collection.removeItems(normalizedItemIds);
						result = {
							collectionId: String(collectionId),
							removedCount: normalizedItemIds.length,
						};
					}

					if (operation === 'setupCollectionFields') {
						const collectionId = this.getNodeParameter('collectionId', i);
						const fieldsJson = this.getNodeParameter('fieldsJson', i, '[]');
						const skipExistingFields = this.getNodeParameter('skipExistingFields', i, true);

						if (!collectionId || !String(collectionId).trim()) {
							throw new Error('Collection ID is required for Setup Collection Fields operation');
						}

						const collection = await framer.getCollection(String(collectionId));
						if (!collection) {
							throw new Error(`Collection not found for ID: ${String(collectionId)}`);
						}

						let fieldsPayload;
						try {
							fieldsPayload = JSON.parse(String(fieldsJson));
						} catch (parseError) {
							throw new Error(
								`Fields JSON is invalid: ${parseError && parseError.message ? parseError.message : 'parse error'}`,
							);
						}

						if (!Array.isArray(fieldsPayload)) {
							throw new Error('Fields JSON must be a JSON array');
						}

						let fieldsToCreate = fieldsPayload;
						let skippedFieldNames = [];

						if (skipExistingFields) {
							const existingFields = await collection.getFields();
							const existingFieldNames = new Set(
								existingFields
									.map((field) => String(field.name || '').trim().toLowerCase())
									.filter((name) => name.length > 0),
							);

							fieldsToCreate = fieldsPayload.filter((field) => {
								const fieldName = String((field && field.name) || '').trim().toLowerCase();
								if (!fieldName) {
									return true;
								}
								const exists = existingFieldNames.has(fieldName);
								if (exists) {
									skippedFieldNames.push(String(field.name));
								}
								return !exists;
							});
						}

						let createdFields = [];
						if (fieldsToCreate.length > 0) {
							createdFields = await collection.addFields(fieldsToCreate);
						}

						result = {
							collectionId: String(collectionId),
							requestedCount: fieldsPayload.length,
							createdCount: createdFields.length,
							skippedCount: skippedFieldNames.length,
							skippedFieldNames,
							createdFields: createdFields.map((field) => ({
								id: field.id,
								name: field.name,
								type: field.type,
							})),
						};
					}
				} finally {
					// Framer requires explicit disconnect for long-lived API connections.
					await framer.disconnect();
				}

				returnData.push({
					json: {
						operation,
						success: true,
						result,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							success: false,
							error: error.message,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

module.exports = { Framer };
