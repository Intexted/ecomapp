import Head from 'next/head';
import React, { Fragment, useContext } from 'react';
import { Store } from '../utils/Store';
import Footer from './Footer';
import Header from './Header';

function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <Fragment>
      <Head>
        <title>{title ? title + ' -Ecomapp' : 'Ecomapp'}</title>
        <meta
          name="description"
          content="NewsMa is a free news website where you will find the latest
          news on Several categories the website provides also a film
          section where you find find films by category and watch their
          trailers."
        />
        <meta
          content="news,films,trailers,technology,health,sports"
          name="keywords"
        />
        <meta
          property="og:description"
          content="NewsMa is a free news website where you will find the latest
          news on Several categories the website provides also a film
          section where you find find films by category and watch their
          trailers."
        />
        <meta property="og:title" content="NewsMa" />
        <meta name="author" content="NewsMa" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta property="og:image" content="/static/homepage.jpeg" /> */}
      </Head>
      <div className="flex flex-col justify-between min-h-screen">
        <Header cart={cart} />
        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </div>
    </Fragment>
  );
}

export default Layout;
