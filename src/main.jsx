import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import {Provider} from 'react-redux'
import { store } from './store/store';
import { AuthChecker } from './layouts/AuthChecker';



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthChecker>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthChecker>
</Provider>
)
