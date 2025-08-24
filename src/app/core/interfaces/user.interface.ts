export interface User {
  login: string;
  id: number;
  avatar_url: string;
}

export interface UserDetails {
  id: number;
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  location: string;
  followers: number;
  following: number;
  html_url: string;
  blog: string;
}
