import { Octokit } from "octokit";

interface GitHubFile {
  content: string;
  sha: string;
}

interface LinksData {
  links: Array<{ url: string; date: string }>;
}

const getOctokit = () => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }
  return new Octokit({ auth: token });
};

const getRepoInfo = () => {
  const repoUrl = process.env.GITHUB_REPO || "https://github.com/default/repo";
  const parts = repoUrl.replace("https://github.com/", "").split("/");
  return { owner: parts[0], repo: parts[1] };
};

export async function getLinksFromGitHub(): Promise<LinksData> {
  try {
    const octokit = getOctokit();
    const { owner, repo } = getRepoInfo();

    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: "data/links.json",
    });

    if (!Array.isArray(response.data)) {
      const content = Buffer.from(response.data.content, "base64").toString(
        "utf-8"
      );
      const data = JSON.parse(content) as LinksData;
      return data;
    }

    return { links: [] };
  } catch (error) {
    console.error("Error fetching links from GitHub:", error);
    return { links: [] };
  }
}

export async function saveLinksToGitHub(
  linksData: LinksData
): Promise<boolean> {
  try {
    const octokit = getOctokit();
    const { owner, repo } = getRepoInfo();

    // Get current file to get SHA
    let sha: string | undefined;
    try {
      const currentFile = (await octokit.rest.repos.getContent({
        owner,
        repo,
        path: "data/links.json",
      })) as any;

      if (!Array.isArray(currentFile.data)) {
        sha = currentFile.data.sha;
      }
    } catch {
      // File doesn't exist yet, will be created
    }

    const content = Buffer.from(JSON.stringify(linksData, null, 2)).toString(
      "base64"
    );

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: "data/links.json",
      message: `Update links: ${new Date().toISOString()}`,
      content,
      ...(sha && { sha }),
    });

    return true;
  } catch (error) {
    console.error("Error saving links to GitHub:", error);
    return false;
  }
}

export function deduplicateLinks(links: LinksData["links"]): LinksData["links"] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.url)) return false;
    seen.add(link.url);
    return true;
  });
}

export function sortLinksByDate(
  links: LinksData["links"]
): LinksData["links"] {
  return [...links].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
