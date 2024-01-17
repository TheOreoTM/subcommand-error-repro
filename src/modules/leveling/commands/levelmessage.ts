import { DugColors } from '#constants';
import type { GuildMessage } from '#lib/types/Discord';
import { ApplyOptions } from '@sapphire/decorators';
import { send } from '@sapphire/plugin-editable-commands';
import { Subcommand } from '@sapphire/plugin-subcommands';
import { EmbedBuilder } from 'discord.js';

@ApplyOptions<Subcommand.Options>({
	description: 'Update your level message',
	flags: ['raw'],
	aliases: ['lm'],
	subcommands: [{ name: 'help', messageRun: 'msgHelp', default: true }]
})
export class UserCommand extends Subcommand {
	public async msgHelp(message: GuildMessage) {
		const helpEmbed = new EmbedBuilder()
			.setTitle('Level Up Message Help')
			.setDescription(
				[
					'Important variables to know:',
					'- `{@user}` - Will mention the user who leveled up',
					'- `{newlevel}` - Will show the new level of the user',
					'- `{oldlevel}` - Will show the old level of the user',
					'',
					'Below are the list of subcommands and what they do'
				].join('\n')
			)
			.setColor(DugColors.Default)
			.addFields(
				{ name: 'reset', value: 'Reset your message to default' },
				{
					name: 'set',
					value: 'Change your level up message to something default. If you are seen abusing this you will be blacklisted and will get levels deducted from you.'
				},
				{ name: 'show', value: 'Preview your current message' }
			);

		send(message, { embeds: [helpEmbed] });
	}
}
