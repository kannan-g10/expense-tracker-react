import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './src/App';
import './index.css';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const Index = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Index />);
