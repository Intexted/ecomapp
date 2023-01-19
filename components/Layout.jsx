import Head from 'next/head';
import React, { Fragment, useContext } from 'react';
import { Store } from '../utils/Store';
import Footer from './Footer';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <Fragment>
      <Head>
        <title>{title ? title + ' -Ecomapp' : 'Ecomapp'}</title>
        <meta name="description" content="Ecommece Website" />
        <meta
          content="news,films,trailers,technology,health,sports"
          name="keywords"
        />
        <meta property="og:description" content="Ecommece Website" />
        <meta property="og:title" content="Ecomapp" />
        <meta name="author" content="Ecomapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta property="og:image" content="/static/homepage.jpeg" /> */}
      </Head>
      <ToastContainer limit={1} />
      <div className="flex flex-col justify-between min-h-screen">
        <Header cart={cart} dispatch={dispatch} />
        <main className="container m-auto mt-4 md:mt-10 px-4 md:px-14">
          {children}
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}

export default Layout;
