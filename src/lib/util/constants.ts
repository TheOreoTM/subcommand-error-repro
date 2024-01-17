import { seconds } from '#utils/common';
import { envParseString } from '@skyra/env-utilities';

export const ZeroWidthSpace = '\u200B';
export const LongWidthSpace = '\u3000';

export const CDN_URL = `https://cdn.oreotm.xyz`;
export const API_URI = envParseString('API_URI');

export const BotPrefix = '.';
export const BotID = '767781855193464882';
export const MainServerID = '519734247519420438';
export const BotOwners = ['600707283097485322'];
export const EventConfig = {
	EventManager: '1129689783774490656'
};

export const StaffRoles = {
	Junior: '1016966909121527809',
	Staff: '634605860206804992',
	Manager: '904263866270228502',
	Admin: '902884958354407484',
	TrustedAdmin: '1151087011751546900',
	CEO: '1106240922901020793'
};

export const AllStaffRoles = Object.values(StaffRoles);

export const TyperacerConfig = {
	LobbyTime: seconds(12),
	GameTime: seconds(30)
};

export const enum DugColors {
	Halloween = 0xff8257,
	Success = 0x46b485,
	Fail = 0xf05050,
	Warn = 0xfee65c,
	Info = 0x297bd1,
	Loading = 0x23272a,
	Default = 0x2b2d31
}

export enum DugEvents {
	ApplicationCommandPermissionsUpdate = 'applicationCommandPermissionsUpdate',
	AutoModerationActionExecution = 'autoModerationActionExecution',
	AutoModerationRuleCreate = 'autoModerationRuleCreate',
	AutoModerationRuleDelete = 'autoModerationRuleDelete',
	AutoModerationRuleUpdate = 'autoModerationRuleUpdate',
	ClientReady = 'ready',
	GuildAuditLogEntryCreate = 'guildAuditLogEntryCreate',
	GuildAvailable = 'guildAvailable',
	GuildCreate = 'guildCreate',
	GuildDelete = 'guildDelete',
	GuildUpdate = 'guildUpdate',
	GuildUnavailable = 'guildUnavailable',
	GuildMemberAdd = 'guildMemberAdd',
	GuildMemberRemove = 'guildMemberRemove',
	GuildMemberUpdate = 'guildMemberUpdate',
	GuildMemberAvailable = 'guildMemberAvailable',
	GuildMembersChunk = 'guildMembersChunk',
	GuildIntegrationsUpdate = 'guildIntegrationsUpdate',
	GuildRoleCreate = 'roleCreate',
	GuildRoleDelete = 'roleDelete',
	InviteCreate = 'inviteCreate',
	InviteDelete = 'inviteDelete',
	GuildRoleUpdate = 'roleUpdate',
	GuildEmojiCreate = 'emojiCreate',
	GuildEmojiDelete = 'emojiDelete',
	GuildEmojiUpdate = 'emojiUpdate',
	GuildBanAdd = 'guildBanAdd',
	GuildBanRemove = 'guildBanRemove',
	ChannelCreate = 'channelCreate',
	ChannelDelete = 'channelDelete',
	ChannelUpdate = 'channelUpdate',
	ChannelPinsUpdate = 'channelPinsUpdate',
	MessageCreate = 'messageCreate',
	MessageDelete = 'messageDelete',
	MessageUpdate = 'messageUpdate',
	MessageBulkDelete = 'messageDeleteBulk',
	MessageReactionAdd = 'messageReactionAdd',
	MessageReactionRemove = 'messageReactionRemove',
	MessageReactionRemoveAll = 'messageReactionRemoveAll',
	MessageReactionRemoveEmoji = 'messageReactionRemoveEmoji',
	ThreadCreate = 'threadCreate',
	ThreadDelete = 'threadDelete',
	ThreadUpdate = 'threadUpdate',
	ThreadListSync = 'threadListSync',
	ThreadMemberUpdate = 'threadMemberUpdate',
	ThreadMembersUpdate = 'threadMembersUpdate',
	UserUpdate = 'userUpdate',
	PresenceUpdate = 'presenceUpdate',
	VoiceServerUpdate = 'voiceServerUpdate',
	VoiceStateUpdate = 'voiceStateUpdate',
	TypingStart = 'typingStart',
	WebhooksUpdate = 'webhookUpdate',
	InteractionCreate = 'interactionCreate',
	Error = 'error',
	Warn = 'warn',
	Debug = 'debug',
	CacheSweep = 'cacheSweep',
	ShardDisconnect = 'shardDisconnect',
	ShardError = 'shardError',
	ShardReconnecting = 'shardReconnecting',
	ShardReady = 'shardReady',
	ShardResume = 'shardResume',
	Invalidated = 'invalidated',
	Raw = 'raw',
	StageInstanceCreate = 'stageInstanceCreate',
	StageInstanceUpdate = 'stageInstanceUpdate',
	StageInstanceDelete = 'stageInstanceDelete',
	GuildStickerCreate = 'stickerCreate',
	GuildStickerDelete = 'stickerDelete',
	GuildStickerUpdate = 'stickerUpdate',
	GuildScheduledEventCreate = 'guildScheduledEventCreate',
	GuildScheduledEventUpdate = 'guildScheduledEventUpdate',
	GuildScheduledEventDelete = 'guildScheduledEventDelete',
	GuildScheduledEventUserAdd = 'guildScheduledEventUserAdd',
	GuildScheduledEventUserRemove = 'guildScheduledEventUserRemove',
	// Custom Events
	FactionJoin = 'factionJoin',
	FactionSendInvite = 'factionSendInvite',
	TriggerDrop = 'triggerDrop',
	MemberLevelUp = 'memberLevelUp',
	GuildMessageDelete = 'guildMessageDelete',
	LogSend = 'logSend'
}

export const ProgressBar = {
	StartEmpty: `<:PB1E:1164479248271159306>`,
	StartHalfFull: `<:PB1HF:1164479266361200712>`,
	StartFull: `<:PB1C:1164479305947033600>`,
	MiddleEmpty: `<:PB2E:1164479915048050709>`,
	MiddleHalfFull: `<:PB2HF:1164479708021403698>`,
	MiddleFull: `<:PB2F:1164479717202743296>`,
	MiddleContinue: `<:PB2C:1164479713578852402>`,
	EndEmpty: `<:PB3E:1164479719316652076>`,
	EndHalfFull: `<:PB3HF:1164479711573983272>`,
	EndFull: `<:PB3F:1164479723225763892>`
};

export const DugEmojis = {
	Success: '<:success:1146683498766291024>',
	Fail: '<:fail:1146683470114996274>',
	Reply: '<:reply:1146683155370221639>',
	Off: '<:off:1146683633483141140>',
	On: '<:on:1146683600641736744>',
	Points: '<:point:1151220466913136731>',
	BronzeCrate: '<:crate_bronze:1162411168636350475>',
	SilverCrate: '<:crate_silver:1162410744176980048>',
	GoldCrate: '<:crate_gold:1162411133706190908>',
	MythicCrate: '<:crate_mythic:1162410963492937728>',
	LegendaryCrate: '<:crate_legendary:1162410877627154564>',
	ListBranch: '<:branch_90_curved:1161486023814025266>',
	ListLast: '<:branch_tail_curved:1161479147839828018>',
	Token: '<:token:1187044518311235705>'
};

export const CrateAssets = {
	Common: {
		Image: 'https://i.imgur.com/ZYB2r1f.png',
		Emoji: '<:crate_common:1162792170277834792>'
	},
	Uncommon: {
		Image: 'https://i.imgur.com/M5xKemu.png',
		Emoji: '<:crate_uncommon:1162792140456333453>'
	},
	Rare: {
		Image: 'https://i.imgur.com/cJqMcyq.png',
		Emoji: '<:crate_rare:1162792090451853383>'
	},
	Mythic: {
		Image: 'https://i.imgur.com/Wq756bZ.png',
		Emoji: '<:crate_mythic:1162792060110245979>'
	}
};

export const ChannelIDs = {
	General: '856722573576765450',
	LevelUpChannel: '907323209609797642',
	WelcomeChannel: '856722573576765450',
	LoggingChannel: '1174956832079495210',
	FactionListChannel: '1186666346331775057',
	UpdatesChannel: '1186666298852249680'
};

export const LoggingWebhooks = {
	Message: envParseString('WEBHOOK_LOGGING_MESSAGE')
};
export const WhitelistedChannels = [ChannelIDs.General];

export const NotificationChannelID = ChannelIDs.General;

export const LeavingTaxPercentage = 0.1;
