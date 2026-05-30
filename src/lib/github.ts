import type { GitHubProfile, GitHubRepo } from './types';

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function getProfile(username: string): Promise<GitHubProfile> {
  const cacheKey = `gh_profile_${username}`;
  const cached = sessionStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  
  const data = await res.json();
  sessionStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
  
  return data;
}

export async function getRepos(username: string): Promise<GitHubRepo[]> {
  const cacheKey = `gh_repos_${username}`;
  const cached = sessionStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  
  const data = await res.json();
  sessionStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
  
  return data;
}
