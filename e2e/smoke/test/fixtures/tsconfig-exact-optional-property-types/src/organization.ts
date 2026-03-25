import { reignAuth } from "reign-auth";
import { organization } from "reign-auth/plugins";

export const auth = reignAuth({
	plugins: [
		organization({
			requireEmailVerificationOnInvitation: true,
			creatorRole: "owner",
			teams: {
				enabled: true,
			},
			dynamicAccessControl: {
				maximumRolesPerOrganization: 20,
				enabled: true,
			},
		}),
	],
});

export const auth2 = reignAuth({
	plugins: [organization({})],
});
