import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

function Header() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { status, data: session } = useSession();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/' });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchInputRef.current.value) {
      return;
    }

    console.log(searchInputRef.current.value);
    // router.push(`/search/${searchInputRef.current.value}`);
    // setSearchOpen(false);
  };

  // console.log(router.asPath.includes('admin'));

  return (
    <header
      className="sticky top-0 bg-[#ffffffcc]"
      style={{ backdropFilter: 'saturate(180%) blur(5px)' }}
    >
      <nav className="flex items-center px-4 justify-between h-20 shadow-md  ">
        <div className="flex items-center gap-10">
          {router.asPath.includes('admin') && (
            <>
              {menuOpen ? (
                <svg
                  onClick={() => {
                    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
                  }}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7 md:hidden"
                  onClick={() => {
                    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
              )}
            </>
          )}

          <Link href="/" legacyBehavior>
            <div className="flex items-center gap-1 cursor-pointer">
              <img
                src="https://www.svgrepo.com/show/444859/shopping-cart.svg"
                width={30}
                alt=""
              />
              <a className="text-xl font-bold text-blue-900">Ecomapp</a>
            </div>
          </Link>
        </div>
        {!router.asPath.includes('admin') && (
          <div className="md:flex items-center hidden">
            <form
              onSubmit={(e) => handleSearch(e)}
              className="flex shadow-lg space-x-1 items-center 
            border rounded-[50px]  justify-between relative overflow-hidden bg-white"
            >
              <input
                type="text"
                placeholder="Search Here ..."
                className="p-3 pl-5 h-10 w-48 border-0 focus:ring-0 dark:text-[#121212] text-sm rounded-lg bg-white"
                ref={searchInputRef}
              />
              <button
                onClick={(e) => handleSearch(e)}
                className="bg-amber-300 border rounded-full h-10 w-10 flex items-center justify-center btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5   cursor-pointer  "
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="#000"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        )}

        <div className="flex items-center gap-5 px-0 md:px-5 ">
          {!router.asPath.includes('admin') && (
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
          )}
          {status === 'loading' ? (
            'Loading'
          ) : session?.user ? (
            // <h1 className="font-bold text-lg cursor-pointer text-blue-500">
            //   {session.user.name}
            // </h1>
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="font-bold flex items-end gap-1 text-lg cursor-pointer text-blue-600">
                <h1>{session.user.name}</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Menu.Button>
              <Menu.Items
                className="absolute right-0 mt-2 w-56 
               origin-top-right bg-white border-2  shadow-lg "
              >
                <Menu.Item>
                  <DropdownLink className="dropdown-link" link="/profile">
                    Profile
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" link="/order-history">
                    Order History
                  </DropdownLink>
                </Menu.Item>
                {session.user.isAdmin && (
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      link="/admin/dashboard"
                    >
                      Admin Dashboard
                    </DropdownLink>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <a
                    className="dropdown-link"
                    link="#"
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
      {menuOpen && (
        <div
          className="flex z-50 flex-col  w-screen
         top-15 fixed text-center px-10 py-5  sb_bg border-y-2
            border-yellow-200 shadow-md "
        >
          <ul className="">
            <li>
              <Link href="/admin/dashboard">
                <div
                  className={`flex items-center justify-center 
            hover: gap-2 mb-3 ${
              router.asPath.includes('dashboard')
                ? 'bg-white'
                : 'hover:bg-[#eee2]'
            } 
            
            py-2 px-8 rounded-md`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-7 h-7 ${
                      !router.asPath.includes('dashboard')
                        ? ' text-[#ebf0f7]'
                        : 'text-[#0d253f]'
                    } `}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                    />
                  </svg>

                  <h1
                    className={` text-xl w-[100px] text-left font-semibold ${
                      router.asPath.includes('dashboard')
                        ? 'text-[#0d253f]'
                        : 'text-[#ebf0f7]'
                    }  `}
                  >
                    Dashboard
                  </h1>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/admin/orders">
                <div
                  className={`flex items-center justify-center ${
                    router.asPath.includes('orders')
                      ? 'bg-white'
                      : 'hover:bg-[#eee2]'
                  }  py-2 px-8 rounded-md gap-2 mb-3`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-7 h-7 ${
                      !router.asPath.includes('orders')
                        ? ' text-[#ebf0f7]'
                        : 'text-[#0d253f]'
                    } `}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <h1
                    className={` text-xl w-[100px] text-left font-semibold ${
                      router.asPath.includes('orders')
                        ? 'text-[#0d253f]'
                        : 'text-[#ebf0f7]'
                    }  `}
                  >
                    Orders
                  </h1>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/admin/products">
                <div
                  className={`flex items-center justify-center ${
                    router.asPath.includes('products')
                      ? 'bg-white'
                      : 'hover:bg-[#eee2]'
                  }  py-2 px-8 rounded-md gap-2 mb-3`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#ebf0f7"
                    className={`w-7 h-7 ${
                      !router.asPath.includes('products')
                        ? ' text-[#ebf0f7]'
                        : 'text-[#0d253f]'
                    } `}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                    />
                  </svg>

                  <h1
                    className={` text-xl w-[100px] text-left font-semibold ${
                      router.asPath.includes('products')
                        ? 'text-[#0d253f]'
                        : 'text-[#ebf0f7]'
                    }  `}
                  >
                    Products
                  </h1>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">
                <div
                  className={`flex items-center justify-center ${
                    router.asPath.includes('users')
                      ? 'bg-white'
                      : 'hover:bg-[#eee2]'
                  }  py-2 px-8 rounded-md gap-2 mb-3`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#ebf0f7"
                    className={`w-7 h-7 ${
                      !router.asPath.includes('users')
                        ? ' text-[#ebf0f7]'
                        : 'text-[#0d253f]'
                    } `}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>

                  <h1
                    className={` text-xl w-[100px] text-left font-semibold ${
                      router.asPath.includes('users')
                        ? 'text-[#0d253f]'
                        : 'text-[#ebf0f7]'
                    }  `}
                  >
                    Users
                  </h1>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
      {menuOpen && (
        <div
          onClick={() => {
            setMenuOpen(false);
          }}
          className="bg-black opacity-25 w-screen h-screen fixed z-10"
        ></div>
      )}
    </header>
  );
}

export default Header;
