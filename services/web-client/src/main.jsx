import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import SocketProvider from './contexts/SocketProvider.jsx';
import MessagesProvider from './contexts/MessagesProvider.jsx';
import UsersProvider from './contexts/UsersProvider.jsx';
import I18NextProvider from './contexts/I18NextProvider.jsx';
import LiveKitProvider from './contexts/LiveKitProvider.jsx';
import './styles/index.css';

const init = () => (
  <SocketProvider>
      <UsersProvider>
        <MessagesProvider>
          <LiveKitProvider>
            <I18NextProvider>
              <App />
            </I18NextProvider>
          </LiveKitProvider>
      </MessagesProvider>
    </UsersProvider>
  </SocketProvider>
);

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);

const virtualDom = init();

root.render(virtualDom);

