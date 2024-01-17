import { DugEmojis } from '#constants';
import { Items } from '#lib/items';
import { ItemValue } from '#lib/types/Data';
import { PaginatedMessageEmbedFields, PaginatedMessageOptions } from '@sapphire/discord.js-utilities';
import { ButtonStyle, ComponentType, EmbedField } from 'discord.js';

export class PaginatedShop extends PaginatedMessageEmbedFields {
	public constructor(options: PaginatedMessageOptions = {}) {
		super(options);
		this.setActions([
			{
				customId: '@sapphire/paginated-messages.firstPage',
				style: ButtonStyle.Secondary,
				emoji: '⏪',
				type: ComponentType.Button,
				run: ({ handler }) => {
					handler.index = 0;
				}
			},
			{
				customId: '@sapphire/paginated-messages.previousPage',
				style: ButtonStyle.Secondary,
				emoji: '◀️',
				type: ComponentType.Button,
				run: ({ handler }) => {
					if (handler.index === 0) {
						handler.index = handler.pages.length - 1;
					} else {
						--handler.index;
					}
				}
			},
			{
				customId: '@sapphire/paginated-messages.stop',
				style: ButtonStyle.Danger,
				emoji: '⏹️',
				type: ComponentType.Button,
				run: ({ collector }) => {
					collector.stop();
				}
			},
			{
				customId: '@sapphire/paginated-messages.nextPage',
				style: ButtonStyle.Secondary,
				emoji: '▶️',
				type: ComponentType.Button,
				run: ({ handler }) => {
					if (handler.index === handler.pages.length - 1) {
						handler.index = 0;
					} else {
						++handler.index;
					}
				}
			},
			{
				customId: '@sapphire/paginated-messages.lastPage',
				style: ButtonStyle.Secondary,
				emoji: '⏩',
				type: ComponentType.Button,
				run: ({ handler }) => {
					handler.index = handler.pages.length - 1;
				}
			}
		]);

		const items: EmbedField[] = [];

		for (const key in Items) {
			if (Object.prototype.hasOwnProperty.call(Items, key)) {
				const item = Items[key as ItemValue];
				items.push({
					name: `${item.emoji} ${item.name} - ${DugEmojis.Points}${item.price}`,
					value: `${item.description}`,
					inline: false
				});
			}
		}

		this.setItems(items).setItemsPerPage(5);
	}
}
