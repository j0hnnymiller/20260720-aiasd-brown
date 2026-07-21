import type { NextConfig } from "next";

const deploymentTarget = process.env.NEXT_OUTPUT_MODE;
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgSite = repoName.endsWith(".github.io");
const basePath = isGithubActions && !isUserOrOrgSite ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: deploymentTarget === "export" ? "export" : "standalone",
  trailingSlash: deploymentTarget === "export" ? true : undefined,
  images: deploymentTarget === "export" ? { unoptimized: true } : undefined,
  basePath: deploymentTarget === "export" ? basePath : undefined,
  assetPrefix: deploymentTarget === "export" ? basePath : undefined,
};

export default nextConfig;
