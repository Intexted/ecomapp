import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

// export async function connectDatabase() {
//     const client = await MongoClient.connect(
//       `mongodb+srv://AppUser:ZWKQpXAgg8YPOJ9J@cluster0.xplj3.mongodb.net/ecomapp?retryWrites=true&w=majority`
//     );

//     return client;
//   }

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md py-10 text-center"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl font-semibold">Login</h1>
        <div className="mb-4 flex flex-col">
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Please enter email ..',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email ..',
              },
            })}
            className="w-full md:w-1/2 m-auto border-2 h-10 mt-1 p-2"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500 ">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4 flex flex-col">
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Please enter password ..',
              minLength: {
                value: 6,
                message: 'password is more than 5 chars ..',
              },
            })}
            className="w-full md:w-1/2 m-auto border-2 h-10 mt-1 p-2"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <button className="primary-button w-full md:w-1/3 m-auto font-semibold">
            Login
          </button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account?
          <Link href="/register">
            <span className="text-blue-600"> Register</span>{' '}
          </Link>
        </div>
      </form>
    </Layout>
  );
}
