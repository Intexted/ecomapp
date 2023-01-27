import axios from 'axios';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useReducer } from 'react';
// import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(162, 222, 208, 1)',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };
  return (
    // <Layout title="Admin Dashboard">
    <>
      <Header />
      <div className="flex items-start flex-col md:flex-row md:gap-5">
        <Sidebar />
        <div className="py-5  md:p-5 md:w-4/5">
          <h1 className=" pl-5 text-2xl font-semibold">Overview</h1>
          <h1 className="pl-5 text-base font-normal text-gray-700">
            {moment(Date.now()).format('DD MMMM YYYY')}
          </h1>
          {loading ? (
            <div className="p-5 font-semibold">Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <Link href="/admin/orders">
                  <div className="card text-center m-5 p-5 hover:shadow-xl shadow-md">
                    <p className="text-2xl text-gray-800">
                      ${summary.ordersPrice}{' '}
                    </p>
                    <p>Sales</p>
                    <h1 className="text-blue-500 font-semibold">View sales</h1>
                  </div>
                </Link>
                <Link href="/admin/orders">
                  <div className="card text-center m-5 p-5 hover:shadow-xl shadow-md">
                    <p className="text-2xl text-gray-800">
                      {summary.ordersCount}{' '}
                    </p>
                    <p>Orders</p>
                    <h1 className="text-blue-500 font-semibold">View orders</h1>
                  </div>
                </Link>
                <Link href="/admin/products">
                  <div className="card text-center m-5 p-5 hover:shadow-xl shadow-md">
                    <p className="text-2xl text-gray-800">
                      {summary.productsCount}{' '}
                    </p>
                    <p>Products</p>
                    <h1 className="text-blue-500 font-semibold">
                      View products
                    </h1>
                  </div>
                </Link>
                <Link href="/admin/users">
                  <div className="card text-center m-5 p-5 hover:shadow-xl shadow-md">
                    <p className="text-2xl text-gray-800">
                      {summary.usersCount}{' '}
                    </p>
                    <p>Users</p>
                    <h1 className="text-blue-500 font-semibold">View users</h1>
                  </div>
                </Link>
              </div>
              <div className="shadow-md border p-5 mx-5 rounded-lg hover:shadow-lg">
                <h2 className="text-xl">Sales Report</h2>
                <Bar
                  options={{
                    legend: { display: true, position: 'right' },
                  }}
                  data={data}
                />
              </div>
              {/* <h2 className="text-xl">Popular Selling Product</h2> */}
            </div>
          )}
        </div>
      </div>
    </>
    // </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
