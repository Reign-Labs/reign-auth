import { base64 } from "@reign-auth/utils/base64";
import { createHash } from "@reign-auth/utils/hash";

export async function hashToBase64(
	data: string | ArrayBuffer,
): Promise<string> {
	const buffer = await createHash("SHA-256").digest(data);
	return base64.encode(buffer);
}
