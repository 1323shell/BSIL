import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './App.css';
import {firebaseApp, filterDataForUpdate} from './firebase';
import history from './history';
import reducer from './reducers';
import {logUser} from './actions';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user logged ===', user);
        const {email} = user;

        const updates = {};
        updates['/userID/'] = {id: user.uid};
        filterDataForUpdate.update(updates);

        store.dispatch(logUser(email));
        history.push('/search')
    } else {
        console.log('user NOT logged');
        history.replace('/signin')
    }
});

ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={history}>
            <div>
                <Route path="/search" component={App} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);