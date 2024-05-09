import './App.css';
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFoundPage from './components/NotFound';
import Login from './components/Login';
import Chat from './components/Chat';
import Registration from './components/Registration';

const App = () => {
  const token = useSelector((state) => state.user.token);
  // const token = localStorage.getItem("token");
  const isAuthorized = !!token;
  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthorized ? <Chat /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
