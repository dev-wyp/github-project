import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

export const searchUsers = (query: string, page: number = 1) => {
  return api.get(`/search/users?q=${query}&page=${page}&per_page=10`);
};

export const getUserDetails = (username: string) => {
  return api.get(`/users/${username}`);
};

export const getUserRepos = (username: string, page: number) => {
  return api.get(`/users/${username}/repos?page=${page}&per_page=10`);
};

export const getRepoIssues = (owner: string, repo: string, page: number) => {
  return api.get(`/repos/${owner}/${repo}/issues?page=${page}&per_page=10`);
};

export const createIssue = (
  owner: string,
  repo: string,
  issueData: { title: string; body?: string }
) => {
  return api.post(`/repos/${owner}/${repo}/issues`, issueData);
};
