import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';

import routes from './const/routes.js';
import FullRoomPage from './pages/FullRoomPage/FullRoomPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import ChatPage from './pages/ChatPage/ChatPage.jsx';
import { useAuth } from './hooks/useAuth.js';
import AuthProvider from './contexts/AuthProvider.jsx';
import './styles/App.css';

const PrivateChatOutlet = () => {
  const auth = useAuth(); 
  const isUserAuthorized = !!auth.user;

  return isUserAuthorized ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path={routes.chatPagePath()} element={<PrivateChatOutlet />}>
            <Route path="" element={<ChatPage />} />
        </Route>
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route path={routes.fullRoomPagePath()} element={<FullRoomPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;


  