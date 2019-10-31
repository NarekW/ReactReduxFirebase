import React from 'react';
import './App.css';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from "react-router-dom";

import RegistrationForm from './Components/registrationForm/regForm';

import reducer from './Components/reducers/index';
import Profile from './Components/userpage/profile';


import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBhERN9Se8MbL1Decpysnu3XkSU6sYnJfA",
    authDomain: "nbook-26602.firebaseapp.com",
    databaseURL: "https://nbook-26602.firebaseio.com",
    projectId: "nbook-26602",
    storageBucket: "nbook-26602.appspot.com",
    messagingSenderId: "128694742117",
    appId: "1:128694742117:web:32a1f5fbd1b2043b5d2a8c",
    measurementId: "G-X0WJZ4RTM5"
  };

firebase.initializeApp(config);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(()=>{
  console.log('subscribe', store.getState());
});

class App extends React.Component{
  render(){
    console.log('render app')
    return(
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/">
            <RegistrationForm firebase={firebase}/>
          </Route>
          <Route exact path="/profile/:id">
            <Profile firebase={firebase}/>
          </Route>
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;