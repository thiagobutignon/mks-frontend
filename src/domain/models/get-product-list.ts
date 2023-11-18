export interface GetProductList {
  perform: (params: GetProductList.Params) => Promise<GetProductList.Response>
}

export namespace GetProductList {
  export type Params = {
    page: number
    rows: number
    sortBy: 'id' | 'name' | 'price'
    orderBy: 'DESC' | 'ASC'
  }
  export type Response = {
    products: Product[]
    count: number
  };
}

export type Product = {
  id: number
  name: string
  brand: string
  description: string
  photo: string
  price: string
  createdAt: string
  updatedAt: string
}
