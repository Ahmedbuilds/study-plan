const repository = process.env.GITHUB_REPOSITORY ?? "";
const [owner, repo] = repository.split("/");
const isUserOrOrgSite = owner && repo === `${owner}.github.io`;
const githubPagesBaseUrl = repository && !isUserOrOrgSite ? `/${repo}` : "";

export default {
  expo: {
    name: "Study Plan",
    slug: "study-plan",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "dark",
    assetBundlePatterns: ["**/*"],
    experiments: {
      baseUrl: process.env.EXPO_BASE_URL ?? githubPagesBaseUrl,
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#0D1117",
      },
    },
  },
};
