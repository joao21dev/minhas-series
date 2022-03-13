import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <Navbar color="dark" dark expand="md">
      <div className="container">
        <NavbarBrand tag={Link} to="/">
          Minhas Séries
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} onClick={toggle} to="/series" href="/">
                Séries
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} onClick={toggle} to="/generos" href="/">
                Gêneros
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
