import { createRandomStringGenerator } from "@reign-auth/utils/random";
export const generateRandomString = createRandomStringGenerator(
	"a-z",
	"0-9",
	"A-Z",
	"-_",
);
