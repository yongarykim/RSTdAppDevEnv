import React from 'react';
import { Nav, NavItem, NavLink} from 'reactstrap';

const SideBar  = (props) => {

        return (
            <div style={{float:'left', width:'200px', height:'2048px', backgroundColor:'#F8F9FA'}}>
                <Nav vertical>
                    <NavItem>
                        <NavLink href="#">동남아</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">중국</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">일본</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">남태평양</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">유럽</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">북미</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink disabled href="#">남미 (준비중)</NavLink>
                    </NavItem>

                </Nav>
            </div>
        )
}

export default SideBar;