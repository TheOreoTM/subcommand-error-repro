import { DugColors } from '#constants';
import { DugCommand } from '#lib/structures';
import type { GuildMessage } from '#lib/types/Discord';
import { seconds } from '#lib/util/common';
import { formatSuccessMessage } from '#lib/util/formatter';
import { ApplyOptions } from '@sapphire/decorators';
import { Args, BucketScope } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import { Subcommand } from '@sapphire/plugin-subcommands';
import { EmbedBuilder } from 'discord.js';

@ApplyOptions<Subcommand.Options>({
	name: 'card',
	description: 'Modify your rank card',
	flags: ['remove'],
	cooldownDelay: seconds(0),
	cooldownLimit: 1,
	cooldownScope: BucketScope.User,
	subcommands: [
		{ name: 'help', chatInputRun: 'slashHelp', messageRun: 'msgHelp', default: true },
		{ name: 'reset', chatInputRun: 'slashReset', messageRun: 'msgReset' },
		{ name: 'bgimage', chatInputRun: 'slashBgImage', messageRun: 'msgBgImage' },
		{ name: 'bgColor', chatInputRun: 'slashBgColor', messageRun: 'msgBgColor' },
		{ name: 'borderColor', chatInputRun: 'slashBorderColor', messageRun: 'msgBorderColor' },
		{ name: 'hideBorder', chatInputRun: 'slashNoBorder', messageRun: 'msgNoBorder' },
		{ name: 'showBorder', chatInputRun: 'slashYesBorder', messageRun: 'msgYesBorder' },
		{ name: 'avatarBorderColor', chatInputRun: 'slashAvBorderColor', messageRun: 'msgAvBorderColor' },
		{ name: 'barColor', chatInputRun: 'slashBarColor', messageRun: 'msgBarColor' },
		{ name: 'fontColor', chatInputRun: 'slashFontColor', messageRun: 'msgFontColor' }
	]
})
export class UserCommand extends Subcommand {
	public override registerApplicationCommands(registry: Subcommand.Registry) {
		// Register Chat Input command
		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
				.addSubcommand((builder) =>
					builder //
						.setName('bgimage')
						.setDescription('Change your cards background image')
						.addAttachmentOption((option) =>
							option //
								.setName('image')
								.setDescription('The image you want to set as your background image')
								.setRequired(true)
						)
				)
		);
	}
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

	public async msgReset(message: GuildMessage) {
		const member = message.member;
		await this.container.db.userLevel.resetCustoms(member.id);

		const embed = new EmbedBuilder().setDescription(formatSuccessMessage('Successfully reset `card`')).setColor(DugColors.Success);

		send(message, { embeds: [embed] });
	}

	public async msgBgColor(message: GuildMessage, args: Args) {
		const member = message.member;
		const hexCode = await args.pick('hexCode');
		await this.container.db.userLevel.updateCustoms(member.id, {
			bgColor: hexCode
		});

		const embed = new EmbedBuilder().setDescription(formatSuccessMessage('Successfully set your `bgColor`')).setColor(hexCode);

		send(message, { embeds: [embed] });
	}

	public async msgFontColor(message: GuildMessage, args: Args) {
		const member = message.member;
		const fontColor = await args.pick('hexCode');
		await this.container.db.userLevel.updateCustoms(member.id, {
			fontColor
		});

		const embed = new EmbedBuilder().setDescription(formatSuccessMessage('Successfully set your `fontColor`')).setColor(fontColor);

		send(message, { embeds: [embed] });
	}

	public async msgBarColor(message: GuildMessage, args: Args) {
		const member = message.member;
		const barColor = await args.pick('hexCode');
		await this.container.db.userLevel.updateCustoms(member.id, {
			barColor
		});

		const embed = new EmbedBuilder().setDescription(formatSuccessMessage('Successfully set your `barColor`')).setColor(barColor);

		send(message, { embeds: [embed] });
	}

	public async msgAvBorderColor(message: GuildMessage, args: Args) {
		const member = message.member;
		const avatarBorderColor = await args.pick('hexCode');
		await this.container.db.userLevel.updateCustoms(member.id, {
			avatarBorderColor
		});

		const embed = new EmbedBuilder()
			.setDescription(formatSuccessMessage('Successfully set your `avatarBorderColor`'))
			.setColor(avatarBorderColor);

		send(message, { embeds: [embed] });
	}

	// public async msgBorderColor(message: GuildMessage, args: Args) {
	// 	const member = message.member;
	// 	const borderColor = await args.pick('hexCode');
	// 	await this.container.db.userLevel.updateCustoms(member.id, {
	// 		borderColor
	// 	});

	// 	const embed = new EmbedBuilder().setDescription(formatSuccessMessage('Successfully set your `borderColor`')).setColor(borderColor);

	// 	send(message, { embeds: [embed] });
	// }

	public async msgNoBorder(message: GuildMessage) {
		const member = message.member;
		await this.container.db.userLevel.updateCustoms(member.id, {
			noBorder: true
		});

		const embed = new EmbedBuilder().setDescription(formatSuccessMessage('Successfully hid your `border`')).setColor(DugColors.Success);

		send(message, { embeds: [embed] });
	}

	public async msgYesBorder(message: GuildMessage) {
		const member = message.member;
		await this.container.db.userLevel.updateCustoms(member.id, {
			noBorder: false
		});

		const embed = new EmbedBuilder().setDescription(formatSuccessMessage('Successfully un-hid your `border`')).setColor(DugColors.Success);

		send(message, { embeds: [embed] });
	}

	public async slashBgImage(interaction: DugCommand.ChatInputCommandInteraction) {
		const bgImage = interaction.options.getAttachment('image', true).url;
		await this.container.db.userLevel.updateCustoms(interaction.member.id, {
			bgImage
		});

		const embed = new EmbedBuilder().setDescription(formatSuccessMessage('Successfully set your `bgImage`')).setImage(bgImage);

		interaction.reply({ embeds: [embed] });
	}

	public async msgBgImage(message: GuildMessage, args: Args) {
		const member = message.member;
		const remove = args.getFlags('remove');

		if (remove) {
			this.container.db.userLevel.updateCustoms(member.id, {
				bgImage: undefined
			});

			const embed = new EmbedBuilder().setDescription(formatSuccessMessage('Successfully removed your `bgImage`'));

			send(message, { embeds: [embed] });
			return;
		}

		const bgImage = await args.pick('imageLink');
		await this.container.db.userLevel.updateCustoms(member.id, {
			bgImage
		});

		const embed = new EmbedBuilder().setDescription(formatSuccessMessage('Successfully set your `bgImage`')).setImage(bgImage);

		send(message, { embeds: [embed] });
	}
}
