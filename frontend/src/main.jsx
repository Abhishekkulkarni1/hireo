import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

export const Context = createContext({ isAuthorized: false });

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

// Check if root has already been created
const rootElement = document.getElementById('root');
const existingRoot = rootElement._reactRootContainer;

if (!existingRoot) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
} else {
  existingRoot.render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
}
