import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';
import SearchContainer from "./Container/SearchContainer";
import MultipleGridsContainer from "./Container/MultipleGridsContainer";

export default function basicRouter(props) {
    return (
        <Router>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Grid View NavBar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link style={{color:"black"}} to="/">Grid View</Link></Nav.Link>
                    <Nav.Link><Link style={{color:"black"}} to="/multiplegrids">Multiple Grids</Link></Nav.Link>
                </Nav>
            </Navbar>
            <div>

                <hr />
                <Switch>
                    <Route exact path="/">
                        <SearchContainer />
                    </Route>
                    <Route path="/multiplegrids">
                        {/* <About /> */}
                        <MultipleGridsContainer />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

// export default Router;