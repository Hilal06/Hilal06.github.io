import type { GitHubProfile, GitHubRepo } from './types';
import fallbackProfile from '../data/profile.json';

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function getProfile(username: string): Promise<GitHubProfile> {
  const cacheKey = `gh_profile_${username}`;
  
  if (typeof window !== 'undefined') {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      } catch {
        sessionStorage.removeItem(cacheKey);
      }
    }
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    
    const data = await res.json();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
    }
    return data;
  } catch (err) {
    console.warn('GitHub Profile fetch failed, using fallback profile data:', err);
    // Graceful fallback profile object
    return {
      name: fallbackProfile.fullName,
      login: username,
      avatar_url: fallbackProfile.avatarUrl,
      bio: fallbackProfile.bio,
      location: fallbackProfile.address,
      html_url: `https://github.com/${username}`
    };
  }
}

export async function getRepos(username: string): Promise<GitHubRepo[]> {
  const cacheKey = `gh_repos_${username}`;
  
  if (typeof window !== 'undefined') {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      } catch {
        sessionStorage.removeItem(cacheKey);
      }
    }
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    
    const data = await res.json();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
    }
    return data;
  } catch (err) {
    console.warn('GitHub Repos fetch failed, using local projects list:', err);
    return [];
  }
}
