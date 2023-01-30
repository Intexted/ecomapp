import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function Sidebar() {
  const router = useRouter();

  return (
    <div
      className="hidden sb_bg rounded-xl ml-1 mt-5 py-5
    md:py-7 md:flex justify-center w-full md:w-1/5 md:border-r-2 md:h-[90vh]"
    >
      <ul className="">
        <li>
          <Link href="/admin/dashboard">
            <div
              className={`flex items-center 
             gap-2 mb-3 ${
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
                className={` text-xl font-semibold ${
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
              className={`flex items-center ${
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
                className={` text-xl font-semibold ${
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
              className={`flex items-center ${
                router.asPath.includes('products')
                  ? 'bg-white'
                  : 'hover:bg-[#eee2]'
              }  py-2 px-8  rounded-md gap-2 mb-3`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
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
                className={` text-xl font-semibold ${
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
              className={`flex items-center ${
                router.asPath.includes('users')
                  ? 'bg-white'
                  : 'hover:bg-[#eee2]'
              }  py-2 px-8  rounded-md gap-2 mb-3`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
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
                className={` text-xl font-semibold ${
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
  );
}

export default Sidebar;
