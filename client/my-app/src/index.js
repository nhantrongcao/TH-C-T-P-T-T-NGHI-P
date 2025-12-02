import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store,persistor} from './store/redux';
import App from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<BrowserRouter>

  <App />
  
  </BrowserRouter>
</PersistGate>

</Provider>

);