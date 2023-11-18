import { AxiosHttpClient } from './../infra/http/axios-http-client';
import { RemoteGetProductList } from '../data/usecases';

describe('RemoteGetProductList Integration Test', () => {
  test('Should return RemoteGetProductList.Response correctly', async () => {
    const url = 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/'
    const httpClient = new AxiosHttpClient()
    const sut = new RemoteGetProductList(url, httpClient)

    const response = await sut.perform({
      orderBy: 'DESC',
      page: 1,
      rows: 10,
      sortBy: 'id'
    })

    expect(response.count).toBeGreaterThan(1)
    expect(response.products.length).toBeGreaterThan(2)
  });
});
