import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'; // Import the Provider component from react-redux
import { store } from './redux/Store.js'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
  <Provider store={store}>
    <App />
  </Provider>,

  </React.StrictMode>,
)
