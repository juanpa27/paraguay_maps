import ThemeSelector from './ThemeSelector'
import Logo from './Logo'

const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-md w-full">
      <div className="flex-1 items-center">
        <Logo className="text-primary" size={60} />
        <h1 className="normal-case text-xl">Paraguay Maps</h1>
      </div>
      <div className="flex-none">
        <ThemeSelector />
      </div>
    </div>
  )
}

export default Header