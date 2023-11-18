import { HttpClient, HttpStatusCode } from '../../data/protocols';

import { GetProductList } from '../../domain/models';
import { UnexpectedError } from '../../domain/errors';

export class RemoteGetProductList implements GetProductList {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetProductList.Model>
  ) {}

  async perform (params: GetProductList.Params): Promise<GetProductList.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url + `products?page=${params.page}&rows=${params.rows}&sortBy=${params.sortBy}&orderBy=${params.orderBy}`,
      method: 'get'
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as GetProductList.Response;
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteGetProductList {
  export type Model = GetProductList.Response;
}
