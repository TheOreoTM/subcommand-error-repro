import { ApplyOptions } from '@sapphire/decorators';
import { PermissionsPrecondition } from '#lib/structures';

@ApplyOptions<PermissionsPrecondition.Options>({ guildOnly: false })
export class UserPermissionsPrecondition extends PermissionsPrecondition {
	public handle(): PermissionsPrecondition.Result {
		return this.ok();
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		Everyone: never;
	}
}
