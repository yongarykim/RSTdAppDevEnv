import React, {Component} from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';

class TopBar extends Component {

    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">D2(direct tour)</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/simple_storage_test">SimpleStorage Test</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/token_manage">Token Manage</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default TopBar;