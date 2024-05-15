import './App.css';
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';
// import { useSelector } from 'react-redux';
import NotFoundPage from './components/NotFound';
import { useToken } from './components/context/authContext';
import Login from './components/Login';
import Chat from './components/Chat';
import Registration from './components/Registration';

const App = () => {
  const { token } = useToken();

  console.log(token ? 'yes' : 'no', token);
  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Routes>
          <Route
            path="/"
            element={token ? <Chat /> : <Navigate to="/login" />}
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
