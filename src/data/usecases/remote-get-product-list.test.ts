import { mockProductList, mockProductListParams } from '../../domain/mocks';

import { HttpClientSpy } from '../mocks';
import { HttpStatusCode } from '../protocols';
import { RemoteGetProductList } from '.';
import { UnexpectedError } from '../../domain/errors';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteGetProductList
  httpClientSpy: HttpClientSpy<RemoteGetProductList.Model>
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteGetProductList.Model>();
  const sut = new RemoteGetProductList(url, httpClientSpy);
  return {
    sut,
    httpClientSpy
  };
};

describe('RemoteGetProductList', () => {
  test('Should call HttpClient with correct values', async () => {
    const getProductListParams = mockProductListParams()
    const url = faker.internet.url()
    const query = `products?page=${getProductListParams.page}&rows=${getProductListParams.rows}&sortBy=${getProductListParams.sortBy}&orderBy=${getProductListParams.orderBy}`
    const { sut, httpClientSpy } = makeSut(url);

    await sut.perform(getProductListParams);

    expect(httpClientSpy.url).toBe(url + query);
    expect(httpClientSpy.method).toBe('get');
  });

  test('Should throw UnexpectedError if HttpClient returns a status code other than 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };

    const promise = sut.perform(mockProductListParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a GetProductList.Response if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockProductList();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    };

    const productList = await sut.perform(mockProductListParams());

    expect(productList).toEqual(httpResult);
  });
});
