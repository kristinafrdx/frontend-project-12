import './App.css';
import { Route, Routes, BrowserRouter as Router, Navigate, useNavigate } from "react-router-dom";
import NotFoundPage from './components/NotFound';
import Login from './components/Login';
import Chat from './components/Chat';
import { useSelector } from 'react-redux';
import Registration from './components/Registration';

function App() {
  const token = useSelector(state => state.user.token);
  const isAuthorized = token ? true : false;

  return (
    <div className="App vh-100 bg-light">
       <Router>
          <Routes>
            <Route path="/" element={ isAuthorized ? <Chat /> : <Login />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
