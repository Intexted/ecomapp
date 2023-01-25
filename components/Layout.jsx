import Head from 'next/head';
import React, { Fragment } from 'react';
import Footer from './Footer';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ title, children }) {
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
      <ToastContainer limit={1} position="bottom-center" />
      <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <main className="container m-auto mt-4 md:mt-10  md:px-0">
          {children}
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}

export default Layout;
