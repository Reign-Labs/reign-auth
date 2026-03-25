import type { CookieOptions } from "reign-call";

export type ReignAuthCookie = { name: string; attributes: CookieOptions };

export type ReignAuthCookies = {
	sessionToken: ReignAuthCookie;
	sessionData: ReignAuthCookie;
	accountData: ReignAuthCookie;
	dontRememberToken: ReignAuthCookie;
};
