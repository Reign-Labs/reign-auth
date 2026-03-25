import type { ReignAuthPluginDBSchema } from "@reign-auth/core/db";

export const schema = {
	jwks: {
		fields: {
			publicKey: {
				type: "string",
				required: true,
			},
			privateKey: {
				type: "string",
				required: true,
			},
			createdAt: {
				type: "date",
				required: true,
			},
			expiresAt: {
				type: "date",
				required: false,
			},
		},
	},
} satisfies ReignAuthPluginDBSchema;
