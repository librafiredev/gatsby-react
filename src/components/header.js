import React, { useContext } from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby";

import styled, {} from "styled-components";

import { GlobalDispachContext } from "context/GlobalContextProvider"

const Nav = styled.nav`
  .nav-item {
    display: inline-block;
    text-decoration: none;
  }

  .nav-item-current {
    border-bottom: 1px solid ${props => props.theme.color};
  }
`

const isActive = ({ isCurrent }) => {
  return { className: isCurrent ? 'nav-item nav-item-current' : 'nav-item' }
}

const NavLink = props => <Link getProps={isActive} {...props} />

const SiteHeader = styled.header`
  position: fixed;
  width: 100%;
  background: ${props => props.theme.background};
  box-shadow: 0 0 10px 10px rgba(0,0,0,.2);
  padding: 0 10px;
  z-index: 9;
`;

// const CartWidget = styled.div`
//   margin-left: auto;
// `

const Header = () => {
  const dispach = useContext(GlobalDispachContext);

  return (
    <SiteHeader>
      <div
        className="container"
        style={{
          display: `flex`,
          padding: `10px 0`,
          alignItems: `center`,
          minHeight: 80
        }}
      >
        <Nav>
          <NavLink to="/" style={{
            marginRight: 5
          }}>Home</NavLink>
          <NavLink to="/mdposts" style={{
            marginRight: 5
          }}>MdBlog</NavLink>
          <NavLink to="/products" style={{
            marginRight: 5
          }}>Products</NavLink>
        </Nav>

        <div style={{
          padding: `0 10px`,
          marginLeft: `auto`
        }}>
          <button
            style={{
              marginRight: `5px`
            }}
            onClick={() => dispach({
              type: `CHANGE_THEME`,
              someData: `dark`,
            })}
          >
            Dark
              </button>
          <button
            style={{
              marginRight: `5px`
            }}
            onClick={() => dispach({
              type: `CHANGE_THEME`,
              someData: `light`,
            })}
          >
            Light
              </button>
        </div>

        {/* <CartWidget className="snipcart-summary snipcart-checkout">
            <div>
              <strong>My cart</strong>
            </div>
            <div>
              <span className="snipcart-total-items"></span>
              {" "}Items in cart
            </div>
            <div>
              Total:{" "}
              <span className="snipcart-total-price"></span>
            </div>
          </CartWidget> */}
      </div>

    </SiteHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
