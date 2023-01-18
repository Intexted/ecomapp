import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

//

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
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
