import { sso } from "@reign-auth/sso";
import { reignAuth } from "reign-auth";

export const auth = reignAuth({
	plugins: [sso()],
});
