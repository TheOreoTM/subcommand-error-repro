import { ClientConfig, ModuleName, config } from '#config';
import { container, SapphireClient } from '@sapphire/framework';
import { getRootData } from '@sapphire/pieces';
import { join } from 'path';

export class DugClient<Ready extends boolean = boolean> extends SapphireClient<Ready> {
	public readonly loadedModules: ModuleName[] = config.enabled_modules;
	public constructor() {
		super(ClientConfig);

		for (const module of config.enabled_modules) {
			if (isEnabled(module)) enableModule(this, module);
		}
	}

	public override async login(token?: string): Promise<string> {
		return super.login(token);
	}

	public override destroy(): Promise<void> {
		container.db.$disconnect();
		container.cache.disconnect();
		return super.destroy();
	}
}

function isEnabled(moduleName: ModuleName) {
	return config.enabled_modules.includes(moduleName);
}

function enableModule(client: DugClient, moduleName: ModuleName) {
	const rootData = getRootData();

	client.stores.registerPath(join(rootData.root, `modules/${moduleName}`));
}
