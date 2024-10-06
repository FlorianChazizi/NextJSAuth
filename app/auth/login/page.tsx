'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(""); // Track error message
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        }), 
      });

      if( res.ok ){   // login successful
        const data = await res.json();
        console.log("Login Successful:", data);
        router.push('/'); // redirect to homepage
      }else{
        const data = await res.json();
          setError(data.error); // Display error message
      }
      
    } catch (error) {
      setError(' Something went wrong. Please try again later. ')
    }


    console.log('User logged in:', { email, password });
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
           {/* Show Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4 text-center">
            {error}
          </div>
        )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your Password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
