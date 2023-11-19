import { AxiosHttpClient } from '../../infra/http'
import { GetProductList } from '../../domain/models'
import { RemoteGetProductList } from '../../data/usecases'

export const makeGetProductList = (): GetProductList => {
  const url = 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/'
  const axios = new AxiosHttpClient()
  return new RemoteGetProductList(url, axios)
}
