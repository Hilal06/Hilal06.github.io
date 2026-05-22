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

export async function getRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
}
