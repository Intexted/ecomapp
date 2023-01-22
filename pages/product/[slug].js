import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    try {
      const { data } = await axios.get(`/api/products/${product._id}`);

      if (data.countInStock < quantity) {
        return toast.error('Sorry. Product is out of stock');
      }
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="md:col-span-2 ">
          <Image
            src={product.image}
            alt={product.name}
            width={440}
            height={440}
            layout="responsive"
            className="rounded-md shadow-md"
          ></Image>
        </div>
        <div>
          <ul className="mt-4 md:mt-0">
            <li className="mb-2">
              <h1 className="text-lg font-bold">{product.name}</h1>
            </li>
            <li className="mb-2">
              <span className="text-gray-600 font-semibold">Category:</span>{' '}
              {product.category}
            </li>
            <li className="mb-2">
              <span className="text-gray-600 font-semibold">Brand:</span>{' '}
              {product.brand}
            </li>
            <li className="mb-2">
              <span className="text-gray-600 font-semibold">Description:</span>{' '}
              {product.description}
            </li>
            <li className="mb-2">
              {product.rating} of {product.numReviews} reviews
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Link href="/">
        <div className="py-5 md:py-10 flex items-center gap-2 justify-center font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>

          <h1>back to products</h1>
        </div>
      </Link>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
