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

export interface Project {
  name: string;
  description?: string;
  longDescription?: string;
  techStack?: string[];
  features?: string[];
  html_url: string;
  language?: string;
  screenshot?: string;
  images?: string[];
  isPrivate?: boolean;
  updated_at?: string;
}
