import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Home } from './screens/home/';
import { NotFound } from './screens/not-found';

WebFont.load({
  google: {
    families: ['Raleway:400,600', 'sans-serif']
  }
});

export const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
