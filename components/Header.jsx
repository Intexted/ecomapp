import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header>
      <nav className="flex items-center px-4 justify-between h-12 shadow-md ">
        <Link href="/" legacyBehavior>
          <a className="text-lg font-bold">Ecomapp</a>
        </Link>
        <div>
          <Link href="/cart" legacyBehavior>
            <a className="p-2">Cart</a>
          </Link>
          <Link href="/login" legacyBehavior>
            <a className="p-2">Login</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
