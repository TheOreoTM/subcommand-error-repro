import { InventoryItemType } from '#lib/types/Data';
import { PrismaClient } from '@prisma/client';
import { genRandomXp, getLevelInfo } from '#utils/utils';
import { container } from '@sapphire/pieces';

const prisma = new PrismaClient();

/**
 * This file contains utility functions for interacting with the Prisma ORM.
 */
export const xprisma = new PrismaClient().$extends({
	name: 'xprisma',
	model: {
		levelRole: {
			async addRole(roleId: string, level: number) {
				await prisma.levelRole.upsert({
					where: {
						level
					},
					create: {
						level,
						roleId: roleId
					},
					update: {
						level,
						roleId: roleId
					}
				});
			},

			async removeRole(roleId: string) {
				await prisma.levelRole.deleteMany({
					where: {
						roleId
					}
				});
			},

			async setRoles(roles: { roleId: string; level: number }[]) {
				await prisma.levelRole.deleteMany();
				await prisma.levelRole.createMany({ data: roles });
			}
		},
		settings: {
			async setGlobalBoost(value: number) {
				await prisma.settings.upsert({
					create: {
						globalBoost: value
					},
					update: {
						globalBoost: value
					},
					where: {
						id: 'main'
					}
				});
			},

			async getGlobalBoost(setIfNotExists: number) {
				const data = await prisma.settings.findUnique({
					where: {
						id: 'main'
					}
				});

				return data ? data.globalBoost : setIfNotExists;
			},

			async isModuleEnabled(setting: Setting) {
				const data = await prisma.settings.findUnique({
					where: {
						id: 'main'
					}
				});

				if (!data) return false;

				return data[`${setting}Enabled`];
			},

			async setModuleEnabled(setting: Setting, enabled: boolean) {
				await prisma.settings.upsert({
					create: {
						[`${setting}Enabled`]: enabled
					},
					update: {
						[`${setting}Enabled`]: enabled
					},
					where: {
						id: 'main'
					}
				});
			}
		},
		userLevel: {
			async setLevelMessage(userId: string, message: string) {
				await prisma.userLevel.upsert({
					where: {
						userId
					},
					create: {
						userId,
						levelUpMessage: message
					},
					update: {
						levelUpMessage: message
					}
				});
			},

			async resetLevelMessage(userId: string) {
				await prisma.userLevel.upsert({
					where: {
						userId
					},
					create: {
						userId
					},
					update: {
						levelUpMessage: null
					}
				});
			},

			async getLevelMessage(userId: string) {
				const data = await prisma.userLevel.findUnique({
					where: {
						userId
					}
				});

				if (!data) return null;
				return data.levelUpMessage;
			},

			async getCustoms(userId: string) {
				const data = await prisma.userLevel.findUnique({
					where: {
						userId
					},
					select: {
						avatarBorderColor: true,
						barColor: true,
						bgColor: true,
						bgImage: true,
						fontColor: true,
						borderColor: true,
						noBorder: true
					}
				});

				if (data) return data;
				return {
					avatarBorderColor: null,
					barColor: null,
					bgColor: null,
					bgImage: null,
					fontColor: null,
					borderColor: null,
					noBorder: null
				};
			},

			async resetCustoms(userId: string) {
				await prisma.userLevel.upsert({
					where: {
						userId
					},
					update: {
						fontColor: null,
						borderColor: null,
						bgImage: null,
						bgColor: null,
						avatarBorderColor: null,
						barColor: null
					},
					create: {
						userId,
						fontColor: null,
						borderColor: null,
						bgImage: null,
						bgColor: null,
						avatarBorderColor: null,
						barColor: null
					}
				});
			},

			async updateCustoms(userId: string, customs: Partial<CustomOptions>) {
				await prisma.userLevel.upsert({
					where: {
						userId
					},
					update: {
						...customs
					},
					create: {
						userId,
						...customs
					}
				});
			},
			async shouldAddXP(userId: string) {
				const data = await prisma.userLevel.findUnique({
					where: {
						userId
					}
				});
				if (!data) return true;
				const now = new Date();
				const lastXpEarned = new Date(data.lastXpEarned);

				// Calculate the time difference in milliseconds
				const millisecondsSinceLastXp = now.getTime() - lastXpEarned.getTime();
				const secondsSinceLastXp = Math.floor(millisecondsSinceLastXp / 1000);

				// Check if it's been more than 45 seconds since last XP earned
				if (secondsSinceLastXp > 45) {
					return true;
				}

				return false;
			},

			async getRequiredXp(userId: string) {
				const data = await prisma.userLevel.findUnique({
					where: {
						userId
					}
				});

				return data?.requiredXp ? data.requiredXp : 100;
			},

			/**
			 * Retrieves the current level of a user.
			 * @param userId The ID of the user.
			 * @returns The current level of the user, or 0 if not found.
			 */
			async getCurrentLevel(userId: string) {
				const data = await prisma.userLevel.findUnique({
					where: {
						userId
					}
				});

				return data?.currentLevel ? data.currentLevel : 0;
			},

			async getTotalXp(userId: string) {
				const data = await prisma.userLevel.findUnique({
					where: {
						userId
					}
				});

				return data?.totalXp ? data.totalXp : 0;
			},
			async getCurrentXp(userId: string) {
				const data = await prisma.userLevel.findUnique({
					where: {
						userId
					}
				});

				return data?.currentXp ? data.currentXp : 0;
			},

			async addXpBoost(userId: string, amount: number, expiresAt: Date) {
				await prisma.xpBoost.create({
					data: {
						userId,
						amount,
						expiresAt
					}
				});

				await prisma.userLevel.upsert({
					where: {
						userId
					},
					create: {
						userId,
						xpBoost: amount
					},
					update: {
						xpBoost: {
							increment: amount
						}
					}
				});

				const offset = expiresAt.getTime() - Date.now();
				container.tasks.create('ExpireBoostsTask', { amountToRemove: amount, userId: userId }, offset);
			},

			async getLeaderboard(page = 1) {
				const perPage = 10; // Number of users per page
				const offset = (page - 1) * perPage; // Calculate the offset based on the page number

				const topUsers = await prisma.userLevel.findMany({
					take: perPage, // Limit the results to the number of users per page
					skip: offset, // Apply the calculated offset
					orderBy: {
						totalXp: 'desc' // Sort by totalXp in descending order
					}
				});

				return topUsers;
			},

			async getRank(userId: string) {
				const user = await prisma.userLevel.upsert({
					where: {
						userId
					},
					create: {
						userId
					},
					update: {}
				});

				const rank = await prisma.userLevel.count({
					where: {
						totalXp: {
							gte: user.totalXp
						}
					}
				});

				return rank;
			},

			async removeXp(userId: string, amnt?: number) {
				let amount = genRandomXp();
				if (amnt) amount = amnt;

				const data = await prisma.userLevel.upsert({
					where: {
						userId
					},
					update: {
						currentXp: {
							decrement: amount
						},
						totalXp: {
							decrement: amount
						}
					},
					create: {
						currentXp: amount,
						totalXp: amount,
						userId
					}
				});

				// if (data.currentXp < 0) {
				// 	// Handle case where currentXp goes negative (if needed)
				// 	// You may want to adjust this behavior based on your application's logic
				// }

				if (data.currentXp < data.requiredXp) {
					let levelsToRemove = 0;
					let requiredXp = getLevelInfo(data.currentLevel).xpNeededToLevelUp;
					let currentXp = data.currentXp;

					while (currentXp < 0 && data.currentLevel > 0) {
						currentXp = currentXp + requiredXp;
						levelsToRemove++;

						requiredXp = getLevelInfo(data.currentLevel - levelsToRemove).xpNeededToLevelUp;
					}

					await prisma.userLevel.update({
						where: {
							userId
						},
						data: {
							currentXp,
							requiredXp,
							currentLevel: {
								decrement: levelsToRemove // Decrease currentLevel instead of incrementing
							}
						}
					});

					return {
						leveledDown: levelsToRemove > 0 ? true : false,
						levelsRemoved: levelsToRemove,
						newLevel: Math.max(data.currentLevel - levelsToRemove, 0), // Ensure level doesn't go below 0
						oldLevel: data.currentLevel,
						xpRemoved: amount
					};
				}

				return {
					leveledDown: false,
					levelsRemoved: 0,
					newLevel: data.currentLevel,
					oldLevel: data.currentLevel,
					xpRemoved: amount
				};
			},

			async addXp(userId: string, options?: AddXpOptions) {
				const xpBoost = options?.xpBoost ? options.xpBoost : 1;

				let amount: number = genRandomXp();
				if (options?.amount) amount = options.amount;
				if (xpBoost) amount = amount * xpBoost;

				const data = await prisma.userLevel.upsert({
					where: {
						userId
					},
					update: {
						currentXp: {
							increment: amount
						},
						totalXp: {
							increment: amount
						}
					},
					create: {
						currentXp: amount,
						totalXp: amount,
						userId
					}
				});

				if (data.currentXp >= data.requiredXp) {
					let levelsToAdd = 0;
					let requiredXp = data.requiredXp;
					let currentXp = data.currentXp;
					while (currentXp >= requiredXp) {
						currentXp = currentXp - requiredXp;
						levelsToAdd++;

						requiredXp = getLevelInfo(data.currentLevel + levelsToAdd).xpNeededToLevelUp;
					}

					await prisma.userLevel.update({
						where: {
							userId
						},
						data: {
							currentXp,
							requiredXp,
							currentLevel: {
								increment: levelsToAdd
							}
						}
					});

					return {
						leveledUp: levelsToAdd > 0 ? true : false,
						levelsAdded: levelsToAdd,
						newLevel: data.currentLevel + levelsToAdd,
						oldLevel: data.currentLevel,
						xpAdded: amount
					};
				}

				return {
					leveledUp: false,
					levelsAdded: 0,
					newLevel: data.currentLevel,
					oldLevel: data.currentLevel,
					xpAdded: amount
				};
			}
		},
		user: {
			async getUserFaction(userId: string) {
				const user = await prisma.user.findUnique({
					where: {
						id: userId
					}
				});

				if (!user?.factionId) return null;

				const faction = await prisma.faction.findUnique({
					where: {
						id: user.factionId
					}
				});

				return faction ? faction : null;
			},

			async isRegistered(userId: string) {
				const user = await prisma.user.findUnique({
					where: {
						id: userId
					}
				});

				return user ? true : false;
			},
			async register(userId: string) {
				return await prisma.user.upsert({
					where: {
						id: userId
					},
					create: {
						id: userId
					},
					update: {
						id: userId
					}
				});
			},
			/**
			 * Get a user that is expected to be registered
			 * @param userId The is of the user you want to get
			 * @returns A non-null user object
			 */
			async getUser(userId: string) {
				return (await prisma.user.findUnique({
					where: {
						id: userId
					}
				})!)!;
			},
			async hasPendingInvite(userId: string, factionId: number) {
				const factionPendingMembers = (
					(await prisma.faction.findUnique({
						where: {
							id: factionId
						},
						select: {
							pendingMemberIds: true
						}
					})) ?? { pendingMemberIds: [] }
				).pendingMemberIds;

				return factionPendingMembers.includes(userId);
			},
			async getInventory(userId: string) {
				const items = await prisma.item.findMany({
					where: {
						ownerId: userId
					}
				});

				return items as InventoryItemType[];
			}
		}
	}
});

export async function resetAutoIncrement() {
	try {
		await prisma.$queryRaw`
     SELECT setval('"User_idx_seq"', 1, false);
    `;

		console.log('Auto-increment sequence reset successfully.');
	} catch (error) {
		console.error('Error resetting auto-increment sequence:', error);
	} finally {
		await prisma.$disconnect();
	}
}

type Setting = 'leveling';

interface AddXpOptions {
	amount?: number;
	xpBoost?: number;
}

interface CustomOptions {
	bgImage: string;
	bgColor: string;
	borderColor: string;
	avatarBorderColor: string;
	barColor: string;
	fontColor: string;
	noBorder: boolean;
}
