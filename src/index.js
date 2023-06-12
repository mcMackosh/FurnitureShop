import React,{createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserStore } from './store/userStore';
import ShopStore from './store/shopStore';

export const Context = createContext(null)

const userStore = UserStore()



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <React.StrictMode>
    <Context.Provider value = {{user: UserStore(), shop: new ShopStore()}}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
