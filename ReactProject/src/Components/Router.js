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
import '../styles.css';
export default function basicRouter(props) {
    return (
        <Router>
            <Navbar className={'navBar'} variant="dark">
                <Navbar.Brand href="#home"></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link style={{color:"black"}} to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link style={{color:"black"}} to="/multiplegrids">Configuration</Link></Nav.Link>
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