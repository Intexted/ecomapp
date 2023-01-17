/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} legacyBehavior>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`} legacyBehavior>
          <a>
            <h2 className="text-lg font-bold">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-1 font-semibold">{product.brand}</p>
        <p className="font-medium">${product.price}</p>
        <button
          onClick={addToCartHandler}
          className="primary-button"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
