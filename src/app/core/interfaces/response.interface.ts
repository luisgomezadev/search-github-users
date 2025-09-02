import { User } from "./user.interface";

export interface SearchResult {
  response: Response;
  labels: string[];
  followers: number[];
}

export interface Response {
  total_count: number;
  incomplete_results: boolean;
  items: Array<User & { score: number }>;
}
