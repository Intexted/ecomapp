import Header from '@/components/Header';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
// import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    // <Layout title="Admin Dashboard">
    <>
      <Header />
      <div className="flex items-start flex-col md:flex-row md:gap-5">
        <div className=" py-5 md:py-10 flex justify-center w-full md:w-1/5 md:border-r-2 md:h-screen">
          <ul className="">
            <li>
              <Link href="/admin/dashboard">
                <div className="flex items-center gap-2 mb-3 hover:bg-slate-100 py-3 px-10 rounded-md">
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
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                    />
                  </svg>

                  <h1 className=" text-xl font-semibold ">Dashboard</h1>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/admin/orders">
                <div className="flex items-center  bg-slate-400 py-3 px-10 rounded-md gap-2 mb-3">
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
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <h1 className=" text-xl font-semibold ">Orders</h1>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/admin/products">
                <div className="flex items-center hover:bg-slate-100 py-3 px-10 rounded-md gap-2 mb-3">
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
                      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                    />
                  </svg>

                  <h1 className=" text-xl font-semibold ">Products</h1>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">
                <div className="flex items-center hover:bg-slate-100 py-3 px-10 rounded-md gap-2 mb-3">
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
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>

                  <h1 className=" text-xl font-semibold ">Users</h1>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="pb-5 md:p-5 md:w-4/5">
          <h1 className="mb-2 text-xl font-semibold">Admin Orders</h1>

          {loading ? (
            <div className="p-5 font-semibold">Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full overflow-x-auto">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left text-gray-700">ID</th>
                    <th className="p-5 text-left text-gray-700">USER</th>
                    <th className="p-5 text-left text-gray-700">DATE</th>
                    <th className="p-5 text-left text-gray-700">TOTAL</th>
                    <th className="p-5 text-left text-gray-700">PAID</th>
                    <th className="p-5 text-left text-gray-700">DELIVERED</th>
                    <th className="p-5 text-left text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="p-5">{order._id.substring(20, 24)}</td>
                      <td className="p-5 font-medium">
                        {order.user ? order.user.name : 'DELETED USER'}
                      </td>
                      <td className="p-5">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-5 font-medium">${order.totalPrice}</td>
                      <td className="p-5">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'not paid'}
                      </td>
                      <td className="p-5">
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : 'not delivered'}
                      </td>
                      <td className="p-5">
                        <Link
                          href={`/order/${order._id}`}
                          passHref
                          legacyBehavior
                        >
                          <a className="text-blue-500 font-semibold">Details</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
    // </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
