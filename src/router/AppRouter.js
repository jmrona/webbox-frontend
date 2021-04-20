import React, { useEffect } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { PageNotFound } from '../components/pages/404/PageNotFound';
import { HomeScreen } from '../components/pages/HomeScreen/HomeScreen';
import { LoginScreen } from '../components/pages/LoginScreen/LoginScreen';
import { RegisterScreen } from '../components/pages/RegisterScreen/RegisterScreen';
import { Loading } from '../components/ui/Loading/Loading';
import { useUsers } from '../hooks/useUsers';

import { PrivateRoute } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';

export const AppRouter = () => {
	const token = localStorage.getItem('token');
	const [user] = useUsers();

	console.log(user);
	if (!user && user === null) {
		return <Loading />;
	}

	return (
		<Router>
			<Switch>
				<PublicRoute
					exact
					path='/login'
					component={LoginScreen}
					isAuthenticated={!!token}
				/>
				<PublicRoute
					exact
					path='/register'
					component={RegisterScreen}
					isAuthenticated={!!token}
				/>
				<PrivateRoute
					exact
					path='/'
					component={HomeScreen}
					isAuthenticated={!!token}
				/>
				<Route to='/error_404' component={PageNotFound} />
			</Switch>
		</Router>
	);
};
