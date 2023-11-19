import { act, renderHook, waitFor } from '@testing-library/react';

import { GetProductList } from '@/domain/models';
import { mockProductList } from '../../domain/mocks';
import useProductList from './use-product-list';

class GetProductListSpy implements GetProductList {
  callsCount = 0;
  response: GetProductList.Response = {
    count: 0,
    products: []
  };

  constructor (response?: GetProductList.Response) {
    if (response) {
      this.response = response;
    }
  }

  perform = async (): Promise<GetProductList.Response> => {
    this.callsCount++;
    return await Promise.resolve(this.response);
  };
}

describe('useProductList', () => {
  let getProductListSpy: GetProductListSpy;

  beforeEach(() => {
    getProductListSpy = new GetProductListSpy(mockProductList());
  });

  it('initializes with the correct state', async () => {
    const { result, rerender } = renderHook(() => useProductList(getProductListSpy));
    const { state, response } = result.current

    if (!result) {
      act(() => {
        rerender();
      });
    }
    expect(state.isLoading).toBe(true);
    expect(response).toEqual({ count: 0, products: [] });
    expect(state.error).toEqual('')
  });

  it('sets isLoading to true while fetching data', async () => {
    const { result } = renderHook(() => useProductList(getProductListSpy));

    expect(result.current.state.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.state.isLoading).toBe(false);
    });
  });

  // it('updates state correctly on error', async () => {
  //   const error = new Error('An error occurred');
  //   getProductListSpy.perform = async () => await Promise.reject(error);
  //   const { result } = renderHook(() => useProductList(getProductListSpy));
  //   await act(async () => {
  //     await waitFor(() => {
  //       expect(result.current.state.error).toBe(error.message);
  //       expect(result.current.state.products).toEqual([]);
  //     });
  //   })
  // });

  it('reacts to changes in getProductList dependency', async () => {
    const newGetProductListSpy = new GetProductListSpy();
    const { result, rerender } = renderHook(({ getProductList }) => useProductList(getProductList), {
      initialProps: { getProductList: getProductListSpy }
    });

    rerender({ getProductList: newGetProductListSpy });

    await waitFor(() => {
      expect(result.current.state.products).not.toEqual(mockProductList().products);
    });
  });

  // it('adds a product to the cart', () => {
  //   const { result } = renderHook(() => useProductList(getProductListSpy));
  //   console.log('----cart:', { ...result })
  //   const productToAdd: Product = {
  //     id: 1,
  //     name: 'Sample Product',
  //     brand: 'Sample Brand',
  //     description: 'Sample Description',
  //     photo: 'sample-photo-url',
  //     price: '50.00',
  //     createdAt: '2023-01-01T00:00:00.000Z',
  //     updatedAt: '2023-01-01T00:00:00.000Z'
  //   };

  //   result.current.addProductItem(productToAdd);
  //   console.log('----populate:', { ...result })

  //   console.log(result.current.cartItems)
  //   expect(result.current.cartItems).toContain(productToAdd);
  // });

  // it('removes a product from the cart', () => {
  //   const { result } = renderHook(() => useProductList(getProductListSpy));

  //   const productInCart: Product = {
  //     id: 1,
  //     name: 'Sample Product',
  //     brand: 'Sample Brand',
  //     description: 'Sample Description',
  //     photo: 'sample-photo-url',
  //     price: '50.00',
  //     createdAt: '2023-01-01T00:00:00.000Z',
  //     updatedAt: '2023-01-01T00:00:00.000Z'
  //   };

  //   result.current.addProductItem(productInCart);
  //   expect(result.current.cartItems).toContain(productInCart);

  //   const productIdToRemove = 1;
  //   result.current.removeProductItem(productIdToRemove);

  //   expect(result.current.cartItems).not.toContain(productInCart);
  // });
});
