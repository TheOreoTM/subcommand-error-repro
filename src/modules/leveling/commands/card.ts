import { DugColors } from '#constants';
import type { GuildMessage } from '#lib/types/Discord';
import { ApplyOptions } from '@sapphire/decorators';
import { send } from '@sapphire/plugin-editable-commands';
import { Subcommand } from '@sapphire/plugin-subcommands';
import { EmbedBuilder } from 'discord.js';

@ApplyOptions<Subcommand.Options>({
	name: 'card',
	description: 'Modify your rank card',
	flags: ['remove'],
	subcommands: [{ name: 'help', chatInputRun: 'slashHelp', messageRun: 'msgHelp', default: true }]
})
export class UserCommand extends Subcommand {
	public async msgHelp(message: GuildMessage) {
		const helpEmbed = new EmbedBuilder()
			.setTitle('Card Help')
			.setDescription('Below are the list of subcommands and what they do')
			.setColor(DugColors.Default)
			.addFields(
				{ name: 'card reset', value: 'Reset your card to default' },
				{ name: 'card bgColor', value: 'Change your cards background color' },
				{
					name: 'card bgImage',
					value: 'Change your cards background image. Use `--remove` to remove the bgImage. DO NOT MISUSE THIS AND RUIN IT FOR EVERYONE. (experimental)'
				},
				// { name: 'card borderColor', value: 'Change your cards border color' },
				// { name: 'card hideBorder', value: 'Hide the outer border of your card' },
				// { name: 'card showBorder', value: 'Show the outer border of your card' },
				{ name: 'card avatarBorderColor', value: 'Change the border around your avatar' },
				{ name: 'card barColor', value: 'Change the color of the progress bar of your card' },
				{ name: 'card fontColor', value: 'Change the username color of your card' }
			);

		send(message, { embeds: [helpEmbed] });
	}
}
