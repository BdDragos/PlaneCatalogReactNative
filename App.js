import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider, connect } from "react-redux";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import Routes from "./src/core/routes";
import { authReducer } from "./src/reducers/LoginReducer";
import { registerReducer } from './src/reducers/RegisterReducer';
import { planeReducer } from './src/reducers/PlaneListReducer';
import { insertReducer } from './src/reducers/InsertReducer';
import { persistStore, autoRehydrate } from 'redux-persist'; // add new import

const AppNavigator = StackNavigator(Routes)

const loginState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));
const registerState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Register'));
const planeListState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('PlaneList'));
const insertState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Insert'));

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};


class App extends Component {
  render() {
    return (
      <AppNavigator
        screenProps={{ store: { store } }}
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const initialState = {
  auth: { isLoading: false, error: null, username: '', password: '' },
  insert: { wasInserted: false }
};

const rootReducer = combineReducers
  (
  {
    nav: navReducer, auth: authReducer, register: registerReducer, planeList: planeReducer, insert: insertReducer
  }
  );

let store = createStore(rootReducer, initialState, applyMiddleware(thunk));

configureStore = (onComplete) => {
  const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
  persistStore(store, { storage: AsyncStorage }, onComplete);

  return store;
};

export default function Root() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
}
