import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Next Auth
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-gray-300 hover:text-white transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/auth/register" className="text-gray-300 hover:text-white transition duration-300">
              Register
            </Link>
          </li>
          <li>
            <Link href="/auth/login" className="text-gray-300 hover:text-white transition duration-300">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}