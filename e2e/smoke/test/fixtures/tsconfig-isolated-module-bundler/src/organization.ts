import { reignAuth } from "reign-auth";
import { organization } from "reign-auth/plugins";

export const auth = reignAuth({
	plugins: [organization({})],
});
