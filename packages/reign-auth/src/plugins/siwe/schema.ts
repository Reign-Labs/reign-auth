import type { ReignAuthPluginDBSchema } from "@reign-auth/core/db";

export const schema = {
	walletAddress: {
		fields: {
			userId: {
				type: "string",
				references: {
					model: "user",
					field: "id",
				},
				required: true,
				index: true,
			},
			address: {
				type: "string",
				required: true,
			},
			chainId: {
				type: "number",
				required: true,
			},
			isPrimary: {
				type: "boolean",
				defaultValue: false,
			},
			createdAt: {
				type: "date",
				required: true,
			},
		},
	},
} satisfies ReignAuthPluginDBSchema;

export type WalletAddressSchema = typeof schema;
