import { reignAuth } from "reign-auth";
import { username } from "reign-auth/plugins";
import { expectTypeOf } from "vitest";

export const auth = reignAuth({
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		username({
			minUsernameLength: 4,
			maxUsernameLength: 15,
		}),
	],
});

type User = typeof auth.$Infer.Session.user;
expectTypeOf<User>().toEqualTypeOf<{
	createdAt: Date;
	displayUsername?: string | null | undefined;
	email: string;
	emailVerified: boolean;
	id: string;
	image?: string | null | undefined;
	name: string;
	updatedAt: Date;
	username?: string | null | undefined;
}>();
