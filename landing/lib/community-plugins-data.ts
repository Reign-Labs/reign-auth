export interface CommunityPlugin {
	name: string;
	url: string;
	description: string;
	author: {
		name: string;
		github: string;
		avatar: string;
	};
}

export const communityPlugins: CommunityPlugin[] = [
	{
		name: "@dymo-api/reign-auth",
		url: "https://github.com/TPEOficial/dymo-api-reign-auth",
		description:
			"Sign Up Protection and validation of disposable emails (the world's largest database with nearly 14 million entries).",
		author: {
			name: "TPEOficial",
			github: "TPEOficial",
			avatar: "https://github.com/TPEOficial.png",
		},
	},
	{
		name: "reign-auth-harmony",
		url: "https://github.com/gekorm/reign-auth-harmony/",
		description:
			"Email & phone normalization and additional validation, blocking over 55,000 temporary email domains.",
		author: {
			name: "GeKorm",
			github: "GeKorm",
			avatar: "https://github.com/GeKorm.png",
		},
	},
	{
		name: "validation-reign-auth",
		url: "https://github.com/Daanish2003/validation-reign-auth",
		description:
			"Validate API request using any validation library (e.g., Zod, Yup)",
		author: {
			name: "Daanish2003",
			github: "Daanish2003",
			avatar: "https://github.com/Daanish2003.png",
		},
	},
	{
		name: "reign-auth-localization",
		url: "https://github.com/marcellosso/reign-auth-localization",
		description:
			"Localize and customize reign-auth messages with easy translation and message override support.",
		author: {
			name: "marcellosso",
			github: "marcellosso",
			avatar: "https://github.com/marcellosso.png",
		},
	},
	{
		name: "reign-auth-attio-plugin",
		url: "https://github.com/tobimori/reign-auth-attio-plugin",
		description: "Sync your products Reign Auth users & workspaces with Attio",
		author: {
			name: "tobimori",
			github: "tobimori",
			avatar: "https://github.com/tobimori.png",
		},
	},
	{
		name: "reign-auth-cloudflare",
		url: "https://github.com/zpg6/reign-auth-cloudflare",
		description:
			"Seamlessly integrate with Cloudflare Workers, D1, Hyperdrive, KV, R2, and geolocation services. Includes CLI for project generation, automated resource provisioning on Cloudflare, and database migrations. Supports Next.js, Hono, and more!",
		author: {
			name: "zpg6",
			github: "zpg6",
			avatar: "https://github.com/zpg6.png",
		},
	},
	{
		name: "expo-reign-auth-passkey",
		url: "https://github.com/kevcube/expo-reign-auth-passkey",
		description:
			"reign-auth client plugin for using passkeys on mobile platforms in expo apps. Supports iOS, macOS, Android (and web!) by wrapping the existing reign-auth passkey client plugin.",
		author: {
			name: "kevcube",
			github: "kevcube",
			avatar: "https://github.com/kevcube.png",
		},
	},
	{
		name: "reign-auth-credentials-plugin",
		url: "https://github.com/erickweil/reign-auth-credentials-plugin",
		description: "LDAP authentication plugin for Reign Auth.",
		author: {
			name: "erickweil",
			github: "erickweil",
			avatar: "https://github.com/erickweil.png",
		},
	},
	{
		name: "reign-auth-opaque",
		url: "https://github.com/TheUntraceable/reign-auth-opaque",
		description:
			"Provides database-breach resistant authentication using the zero-knowledge OPAQUE protocol.",
		author: {
			name: "TheUntraceable",
			github: "TheUntraceable",
			avatar: "https://github.com/theuntraceable.png",
		},
	},
	{
		name: "reign-auth-firebase-auth",
		url: "https://github.com/yultyyev/reign-auth-firebase-auth",
		description:
			"Firebase Authentication plugin for Reign Auth with built-in email service, Google Sign-In, and password reset functionality.",
		author: {
			name: "yultyyev",
			github: "yultyyev",
			avatar: "https://github.com/yultyyev.png",
		},
	},
	{
		name: "reign-auth-university",
		url: "https://github.com/LuyxLLC/reign-auth-university",
		description:
			"University plugin for allowing only specific email domains to be passed through. Includes a University model with name and domain.",
		author: {
			name: "Fyrlex",
			github: "Fyrlex",
			avatar: "https://github.com/Fyrlex.png",
		},
	},
	{
		name: "@alexasomba/reign-auth-paystack",
		url: "https://github.com/alexasomba/reign-auth-paystack",
		description:
			"Paystack plugin for Reign Auth — integrates Paystack transactions, webhooks, and subscription flows.",
		author: {
			name: "alexasomba",
			github: "alexasomba",
			avatar: "https://github.com/alexasomba.png",
		},
	},
	{
		name: "reign-auth-lark",
		url: "https://github.com/uselark/reign-auth-lark",
		description:
			"Lark billing plugin that automatically creates customers and subscribes them to free plans on signup.",
		author: {
			name: "Vijit",
			github: "vijit-lark",
			avatar: "https://github.com/vijit-lark.png",
		},
	},
	{
		name: "stargate-reign-auth",
		url: "https://github.com/neiii/stargate-reign-auth",
		description:
			"Gate access to resources based on whether the user has starred a repository",
		author: {
			name: "neiii",
			github: "neiii",
			avatar: "https://github.com/neiii.png",
		},
	},
	{
		name: "@sequenzy/reign-auth",
		url: "https://github.com/Sequenzy/sequenzy-reign-auth",
		description:
			"Automatically add users to Sequenzy mailing lists on signup for seamless email marketing integration.",
		author: {
			name: "Sequenzy",
			github: "sequenzy",
			avatar: "https://sequenzy.com/logo.png",
		},
	},
	{
		name: "reign-auth-nostr",
		url: "https://github.com/leon-wbr/reign-auth-nostr",
		description: "Nostr authentication plugin for Reign Auth (NIP-98).",
		author: {
			name: "leon-wbr",
			github: "leon-wbr",
			avatar: "https://github.com/leon-wbr.png",
		},
	},
	{
		name: "@ramiras123/reign-auth-strapi",
		url: "https://github.com/Ramiras123/reign-auth-strapi",
		description: "Plugin for authorization via strapi",
		author: {
			name: "Ramiras123",
			github: "ramiras123",
			avatar: "https://github.com/ramiras123.png",
		},
	},
	{
		name: "reign-auth-razorpay",
		url: "https://github.com/iamjasonkendrick/reign-auth-razorpay",
		description:
			"Razorpay payment plugin for Reign Auth — integrates Razorpay payments, webhooks, and subscription flows.",
		author: {
			name: "iamjasonkendrick",
			github: "iamjasonkendrick",
			avatar: "https://github.com/iamjasonkendrick.png",
		},
	},
	{
		name: "reign-auth-payu",
		url: "https://github.com/iamjasonkendrick/reign-auth-payu",
		description:
			"PayU payment plugin for Reign Auth — integrates PayU payments, webhooks, and subscription flows.",
		author: {
			name: "iamjasonkendrick",
			github: "iamjasonkendrick",
			avatar: "https://github.com/iamjasonkendrick.png",
		},
	},
	{
		name: "reign-auth-usos",
		url: "https://github.com/qamarq/reign-auth-usos",
		description:
			"USOS plugin for Reign Auth - allows students to authenticate using their university credentials via the USOS API. Using oauth 1a.",
		author: {
			name: "qamarq",
			github: "qamarq",
			avatar: "https://github.com/qamarq.png",
		},
	},
	{
		name: "reign-auth-devtools",
		url: "https://github.com/C-W-D-Harshit/reign-auth-devtools",
		description:
			"A devtools panel for Reign Auth that lets you create managed test users from templates, switch between sessions instantly, inspect live session data, and edit fields like roles on the fly. All from a floating React UI that only runs in development.",
		author: {
			name: "C-W-D-Harshit",
			github: "C-W-D-Harshit",
			avatar: "https://github.com/C-W-D-Harshit.png",
		},
	},
];
