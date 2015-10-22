import ReactDOM from 'react-dom';
import React from 'react';
import AppContainer from './containers/AppContainer';
import debug from './utils/debug';
import './assets/app.css';

var dd = debug('index');

window.location.hash = '/';


ReactDOM.render(
  <AppContainer />,
  document.getElementById('react-root')
)

/* Old */
// router.run(Handler => {
//   dd('router.run', Handler);
//   React.render(<Handler />, document.getElementById('react-root'));
// });
