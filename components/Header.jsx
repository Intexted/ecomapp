import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

function Header({ cart, dispatch }) {
  const { status, data: session } = useSession();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/' });
  };

  return (
    <header
      className="sticky top-0 bg-[#ffffffcc]"
      style={{ backdropFilter: 'saturate(180%) blur(5px)' }}
    >
      <nav className="flex items-center px-4 justify-between h-12 shadow-md  ">
        <Link href="/" legacyBehavior>
          <a className="text-lg font-bold">Ecomapp</a>
        </Link>
        <div className="flex items-center gap-5 px-5 ">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                clipRule="evenodd"
              />
            </svg>
            <Link href="/cart" legacyBehavior>
              <a className="p-1 font-semibold">
                Cart{' '}
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </a>
            </Link>
          </div>

          {status === 'loading' ? (
            'Loading'
          ) : session?.user ? (
            // <h1 className="font-bold text-lg cursor-pointer text-blue-500">
            //   {session.user.name}
            // </h1>
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="font-bold text-lg cursor-pointer text-blue-600">
                {session.user.name}
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border-2  shadow-lg ">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    Profile
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/order-history">
                    Order History
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <a
                    className="dropdown-link"
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/login">
              <div className="flex items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>

                <a className="p-1 font-semibold">Login</a>
              </div>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
