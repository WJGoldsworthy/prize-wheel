import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrizeWheel from './components/PrizeWheel';
import './App.css';

function App() {
  return (
  	<Fragment>
	  	<BrowserRouter>
	  		<Switch>
		      <Route exact path='/' component={PrizeWheel} />
		    </Switch>
	    </BrowserRouter>
    </Fragment>
  );
}


export default App;
