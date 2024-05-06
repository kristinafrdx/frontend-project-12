import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import NotFoundPage from "./components/NotFound";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { useSelector } from "react-redux";
import Registration from "./components/Registration";
import { Provider, ErrorBoundary } from '@rollbar/react'

const rollbarConfig = {
  accessToken: 'a7db1e930afb4c3ab5369ddcdc6fab7e',
  environment: 'testenv',
}
function TestError() {
  const a = null
  return a.hello()
}

function App() {
  const token = useSelector(state => state.user.token);
  // const token = localStorage.getItem("token");
  const isAuthorized = token ? true : false;

  return (
    <Provider config={rollbarConfig}>
    <ErrorBoundary>
    <div className="d-flex flex-column h-100">
    <TestError />
    <Router>
        <Routes>
          <Route path="/" element={isAuthorized ? <Chat /> : <Navigate to='/login' /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
    </ErrorBoundary>
    </Provider>
  );
}

export default App;
