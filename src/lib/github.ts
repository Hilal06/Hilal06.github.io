export interface GitHubProfile {
  name: string;
  avatar_url: string;
  bio: string;
  html_url: string;
  location: string;
  login: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  homepage: string;
}

export async function getProfile(username: string): Promise<GitHubProfile> {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function getRepos(username: string, featuredRepos?: string[]): Promise<GitHubRepo[]> {
  const hasFeatured = featuredRepos && featuredRepos.length > 0;
  // Fetch more if we need to search for featured repos, otherwise fetch exactly 4
  const perPage = hasFeatured ? 100 : 4;
  
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  const allRepos: GitHubRepo[] = await res.json();

  if (hasFeatured && featuredRepos) {
    // Filter and sort the repositories to match the exact list and order specified
    return allRepos
      .filter(repo => featuredRepos.map(name => name.toLowerCase()).includes(repo.name.toLowerCase()))
      .sort((a, b) => {
        const indexA = featuredRepos.map(name => name.toLowerCase()).indexOf(a.name.toLowerCase());
        const indexB = featuredRepos.map(name => name.toLowerCase()).indexOf(b.name.toLowerCase());
        return indexA - indexB;
      });
  }

  return allRepos;
}

