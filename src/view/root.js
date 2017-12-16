import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from 'bundle-loader?lazy&name=home!components/Home';
import Test from 'bundle-loader?lazy&name=test!components/Test';

import Side from 'components/Side';
import Loading from 'components/Loading';
import { newBundle } from 'utils/bundle';

const createBundle = newBundle(Loading);
export default props => <HashRouter>
	<div {...props}>
		<Route component={Side} />
		<br />
		<Switch>
			<Route exact path='/' component={createBundle(Home)} />
			<Route path='/test' component={createBundle(Test)} />
			<Route component={createBundle(Test)} />
		</Switch>
	</div>
</HashRouter>