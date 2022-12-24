import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './components/user-system/auth0-provider-with-history';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <div className="App">
          <App />
        </div>
      </Provider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
