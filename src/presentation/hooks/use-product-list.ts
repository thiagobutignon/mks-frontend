import { GetProductList, Product } from '@/domain/models';
import { useEffect, useState } from 'react';

const useProductList = (getProductList: GetProductList): any => {
  const [state, setState] = useState({
    isLoading: false,
    error: ''
  });
  const [response, setResponse] = useState<GetProductList.Response>({
    count: 0,
    products: []
  })
  const [params, setParams] = useState<GetProductList.Params>({
    page: 1,
    rows: 10,
    sortBy: 'id',
    orderBy: 'DESC'
  })
  const [cartItems, setCartItem] = useState<Product[]>([])

  useEffect(() => {
    setState(old => ({ ...old, isLoading: true }));
    getProductList.perform(params)
      .then(response => {
        setResponse(old => ({ ...old, count: response.count, products: response.products }));
        setState(old => ({ ...old, isLoading: false }))
      })
      .catch(error => {
        console.log(error);
        setResponse(old => ({ ...old, response: { count: 0, products: [] } }))
        setState(old => ({ ...old, error: 'An error occurred', isLoading: false }));
      });
  }, [getProductList]);

  const changePage = (params: GetProductList.Params): void => {
    setParams(old => ({ ...old, ...params }))
  }

  const addProductItem = (product: Product): void => {
    setCartItem([...cartItems, product]);
  };
  const removeProductItem = (productId: number): void => {
    setCartItem((oldCartItems) => oldCartItems.filter((item) => item.id !== productId));
  };

  return {
    state,
    response,
    params,
    changePage,
    cartItems,
    addProductItem,
    removeProductItem
  };
};

export default useProductList;
