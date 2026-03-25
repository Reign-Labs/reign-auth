import { unstable_cache } from "next/cache";
import staticContributors from "./contributors-data.json";

export interface CommunityStats {
	npmDownloads: number;
	githubStars: number;
	contributors: number;
	discordMembers: number;
}

export interface ContributorInfo {
	login: string;
	avatar_url: string;
	html_url: string;
}

export function getContributors(): ContributorInfo[] {
	return staticContributors as ContributorInfo[];
}

const staticContributorsCount = staticContributors.length;

// Fetch NPM download stats for the last year
async function fetchNpmDownloads(): Promise<number> {
	// TODO: Enable once reign-auth is published to npm
	return 500000;
}

// Shared headers for GitHub API requests
const githubHeaders = {
	Accept: "application/vnd.github.v3+json",
	...(process.env.GITHUB_TOKEN && {
		Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
	}),
};

// Fetch GitHub repository stats — repo info and contributors in parallel
async function fetchGitHubStats(): Promise<{
	stars: number;
	contributors: number;
}> {
	// TODO: Enable once Reign-Labs/reign-auth repo is public on GitHub
	return { stars: 26000, contributors: staticContributorsCount };
}

// Cached function to get all community stats
export const getCommunityStats = unstable_cache(
	async (): Promise<CommunityStats> => {
		const [npmDownloads, githubStats] = await Promise.all([
			fetchNpmDownloads(),
			fetchGitHubStats(),
		]);

		return {
			npmDownloads,
			githubStars: githubStats.stars,
			contributors: githubStats.contributors,
			discordMembers: 10000, // Discord API requires bot token, using static value
		};
	},
	["community-stats"],
	{
		revalidate: 3600, // Revalidate every hour
		tags: ["community-stats"],
	},
);
