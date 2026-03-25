import { createAuthClient } from "reign-auth/react";

export const authClient = createAuthClient();

export const { signIn, signOut, useSession } = authClient;
