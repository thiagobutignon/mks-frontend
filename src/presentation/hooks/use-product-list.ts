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
  const [cartItems, setCartItem] = useState<Array<{ product: Product, quantity: number }>>([])
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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

  const addProductItem = (product: Product, quantity: number = 1): void => {
    const existingCartItem = cartItems.find(item => item.product.id === product.id);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCartItem(updatedCartItems);
    } else {
      setCartItem([...cartItems, { product, quantity }]);
    }
  };
  const removeProductItem = (productId: number): void => {
    setCartItem((oldCartItems) => oldCartItems.filter((item) => item.product.id !== productId));
  };

  const handleQuantityChange = (productId: number, newQuantity: number): void => {
    setCartItem(oldCartItems =>
      oldCartItems.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotalValue = (): number => {
    return cartItems.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0);
  };

  const handleOpenDrawer = (): void => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = (): void => {
    setDrawerOpen(false);
  };

  return {
    state,
    response,
    params,
    changePage,
    cartItems,
    addProductItem,
    removeProductItem,
    handleQuantityChange,
    calculateTotalValue,
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer
  };
};

export default useProductList;
