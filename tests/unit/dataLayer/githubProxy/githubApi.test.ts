import {GithubApi} from '../../../../src/dataLayer/githubProxy/githubApi';
import {GithubApiError} from '../../../../src/utils/errorhandling/Errors';

describe('GithubApi Test Suite', function() {
  let githubApi: GithubApi | null = null;
  const successResponse = {test: 'test'};
  beforeEach(() => {
    githubApi = new GithubApi();
    global.fetch = () => new Promise((res) => {
      res({
        status: 200,
        // @ts-ignore
        json: () => successResponse,
      });
    });
  });
  test('should return the response on getLatestCommit', async () => {
    const result = await githubApi!.getLatestCommit('test', 'test');
    expect(result).toEqual(successResponse);
  });
  test('should return the response on getTree', async () => {
    const result = await githubApi!.getTree('test', 'test', 'test');
    expect(result).toEqual(successResponse);
  });
  test('should return the response on getBlob', async () => {
    const result = await githubApi!.getBlob('test', 'test', 'test');
    expect(result).toEqual(successResponse);
  });
  test.each([
    ['commits', (api: GithubApi) => api.getLatestCommit('test', 'test')],
    ['trees', (api: GithubApi) => api.getTree('test', 'test', 'test')],
    ['blobs', (api: GithubApi) => api.getBlob('test', 'test', 'test')],
  ])('should request public %s without credentials', async (_name, request) => {
    const fetchMock = jest.fn().mockResolvedValue({
      status: 200,
      json: () => successResponse,
    });
    global.fetch = fetchMock;
    await (request as (api: GithubApi) => Promise<Response>)(githubApi!);
    expect(fetchMock).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/api\.github\.com\/repos\/test\/test\//),
        {method: 'GET', headers: {Accept: 'application/json'}},
    );
  });
  test('should report request limits', async () => {
    global.fetch = jest.fn().mockResolvedValue({status: 403});
    await expect(githubApi!.getLatestCommit('test', 'test')).rejects.toThrow(
        'GitHub API request limit reached or access denied. Please try again later.',
    );
  });
  test('should throw if status is bad', async () => {
    global.fetch = () => new Promise((res) => {
      res({
        status: 400,
        // @ts-ignore
        json: () => ({}),
      });
    });
    await expect(githubApi!.getLatestCommit('test', 'test')).rejects.toThrow(GithubApiError);
  });
});
