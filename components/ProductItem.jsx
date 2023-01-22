/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product, addToCartHandler }) {
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
          onClick={() => addToCartHandler(product)}
          className="primary-button"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
