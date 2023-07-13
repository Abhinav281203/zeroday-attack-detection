import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import homepage from "./components/homepage"
import Readmore from './components/readmore';
import Scan1 from './components/scan1';
import Instructions from './components/instructions';
import Signup from './components/Signup';
import Navbar from './components/navbar';

function App() {
  const [loginres, setloginres] = useState(null);

  useEffect(() => {
    const storedLoginResult = localStorage.getItem("loginResult");
    if (storedLoginResult) {
      setloginres(JSON.parse(storedLoginResult));
    }
  }, []);

  const handlelogin = (result) => {
    setloginres(result);
    console.log(loginres);
    localStorage.setItem("loginResult", JSON.stringify(result));
  }
  const handlelogout = () => {
    setloginres(null);
    localStorage.removeItem("loginResult");
    window.location.href = '/';
  }

  if (loginres && localStorage.getItem("loginResult")){
    return (
      <div className="App">
        <div>
          <Router>
            <Switch>
              <Route path="/nv" component={() => <Navbar user={loginres} logout={handlelogout} />} />
              {/* <Route exact path="/" component={homepage} /> */}
              <Route path="/about" component={() => <Readmore user={loginres} logout={handlelogout} />} />
              <Route path="/scan" component={() => <Scan1 user={loginres} logout={handlelogout}/>} />
              <Route path="/instructions" component={() => <Instructions user={loginres} logout={handlelogout}/>} />
              {/* <Route path="/signup" component={() => <Signup handlelogin={handlelogin} />} /> */}
            </Switch>
          </Router>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div>
          <Router>
            <Switch>
              {/* {loginres && <Route path="/nv" component={() => <Navbar user={loginres} />} />} */}
              {/* <Route path="/nv" component={Navbar} /> */}
              <Route exact path="/" component={homepage} />
              <Route path="/about" component={Readmore} />  
              {/* <Route path="/scan" component={Scan1} />
              <Route path="/instructions" component={Instructions} /> */}
              <Route path="/signup" component={() => <Signup handlelogin={handlelogin} />} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
  

}

export default App;
