import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrizeWheel from './components/PrizeWheel';
import './App.css';

const W2SWheel = () => (
	<PrizeWheel title='W2S' />
);

const YungChipWheel = () => (
	<PrizeWheel title='YungChip' />
);

function App() {
  return (
  	<Fragment>
	  	<BrowserRouter>
	  		<Switch>
		      <Route path='/W2S' component={W2SWheel} />
			  <Route path='/yungchip' component={YungChipWheel} />
			  <Route path='/' component={PrizeWheel} />
		    </Switch>
	    </BrowserRouter>
    </Fragment>
  );
}


export default App;
