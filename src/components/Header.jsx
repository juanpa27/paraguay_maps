import React from 'react'
import ThemeSelector from './ThemeSelector'
import Logo from './Logo'

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-md w-full">
      <div className="flex-1 items-center">
        <Logo className="text-primary mr-2" size={32} />
        <a className="btn btn-ghost normal-case text-xl">Paraguay Maps</a>
      </div>
      <div className="flex-none">
        <ThemeSelector />
      </div>
    </div>
  )
}

export default Header