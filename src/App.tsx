import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from "./searchResult/searchResult";
import { Discover } from "./discover/Discover";
import { MoreInfo } from "./moreInfo/moreInfo";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div className="All">
          <nav>
            <ul id="navbar">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/discover">Discover</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/discover" component={Discover} />
          <Route path="/more-info/:id" component={MoreInfo} />
        </div>
      </Router>
    </div>
  );
};

export default App;
