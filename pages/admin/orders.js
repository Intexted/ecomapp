import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
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
        <Sidebar />
        <div className="p-5 md:p-5 md:w-4/5 overflow-x-auto w-full">
          <h1 className="mb-2 text-2xl font-semibold">Admin Orders</h1>

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
