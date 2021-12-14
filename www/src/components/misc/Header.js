import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => <div className="py-5 text-white w-full bg-indigo-dark">
  <div className="flex flex-wrap items-center justify-between m-auto max-w-xl px-2 w-full">
    <Link to='/' className="logo-link hover:underline logo-link no-underline text-white my-2">
      <span className="text-lg uppercase tracking-wide">YOUR LOCAL STORE</span>
    </Link>

    <nav id="main" className="text-sm -my-2">
      <Link to='/about-us' className="logo-link hover:underline logo-link no-underline text-white my-2">About</Link>
      <Link to='/new-item' className="logo-link hover:underline logo-link no-underline text-white my-2 ml-4">New Fruit</Link>
    </nav>
  </div>
</div>
