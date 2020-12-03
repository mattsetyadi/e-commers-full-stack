import React, { useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from './Components/Checkout';
import Login from './Components/Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Components/Orders';

const promise = loadStripe(
  'pk_test_51HtUqyKwRSWgW3TK14RkNGBxm5QVg32NfXkwBu2R1WcU7b7Tl8Wtskvs1Z7Es6Ou4diI7w7mZsYBYQyKxQACp9Fc00tbJh5Prf',
);

function App() {
  const [{}, dispatch] = useStateValue();
  // {} diatas : objek kosong untuk mengambil user, jika tdk ada maka user tidak di push

  //tracking everything about user >> like who is sign in
  useEffect(() => {
    // will only run once  when the app comonents load

    // hanya refresh code ketika terjadi sign in user atau sign out
    auth.onAuthStateChanged((authUser) => {
      console.log('USER LOGED IN IS >>>', authUser);

      if (authUser) {
        // the user just logged in / was logged in (theres user log in)

        //we push data user to data layer (context api)
        dispatch({
          type: 'SET_USER', //key to push user to data layeer
          user: authUser, //user we get them from authUser
        });
      } else {
        // the user is logged out

        //we remove user ferom dataLayer if they're logged out (back to null)
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);
  // jika tdk ada array kosong [] maka data layer akan bekerja terus mnerus dan browser crash

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
