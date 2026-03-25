import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "Reign Auth",
	slug: "reign-auth",
	scheme: "reign-auth",
	version: "0.1.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "automatic",
	splash: {
		image: "./assets/icon.png",
		resizeMode: "contain",
		backgroundColor: "#1F104A",
	},
	web: {
		bundler: "metro",
		output: "server",
	},
	ios: {
		bundleIdentifier: "your.bundle.identifier",
		supportsTablet: true,
	},
	android: {
		package: "your.bundle.identifier",
		adaptiveIcon: {
			foregroundImage: "./assets/icon.png",
			backgroundColor: "#1F104A",
		},
	},
	// extra: {
	//   eas: {
	//     projectId: "your-eas-project-id",
	//   },
	// },
	experiments: {
		tsconfigPaths: true,
		typedRoutes: true,
	},
	plugins: [
		[
			"expo-router",
			{
				origin: "http://localhost:8081",
			},
		],
		"expo-web-browser",
		"expo-secure-store",
		"expo-font",
	],
});
