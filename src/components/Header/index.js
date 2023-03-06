import {Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {dummy} = props
  return (
    <div>
      <nav className="nav-bar-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
            className="website-logo-image"
          />
        </Link>
      </nav>
    </div>
  )
}

export default Header
