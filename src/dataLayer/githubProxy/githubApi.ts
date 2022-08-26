import {GithubApiError} from '../../utils/errorhandling/Errors';

export class GithubApi {
  private readonly BASE_URL = 'https://api.github.com';

  public async getLatestCommit(username: string, repository: string): Promise<Response> {
    return this.fetch(`/repos/${username}/${repository}/commits`);
  }

  public async getTree(username: string, repository: string, sha: string): Promise<Response> {
    return this.fetch(`/repos/${username}/${repository}/git/trees/${sha}`);
  }

  public async getBlob(username: string, repository: string, sha: string): Promise<Response> {
    return this.fetch(`/repos/${username}/${repository}/git/blobs/${sha}`);
  }

  private async fetch(endpoint: string): Promise<Response> {
    let response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    response = this.checkStatus(response);
    return response.json();
  }

  private checkStatus(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else if (response.status === 403) {
      throw new GithubApiError('GitHub API request limit reached or access denied. Please try again later.');
    } else if (response.status === 404) {
      throw new GithubApiError('We\'re unable to find your repository. Either it doesn\'t exist or it is private.');
    } else if (response.status === 409) {
      throw new GithubApiError('No commits found for this repository');
    } else {
      throw new GithubApiError('Failed to fetch GitHub: ' + response.statusText);
    }
  }
}
