
import './App.css';
import CreateFlight from './components/CreateFlight';
import AllFlights from './components/AllFlights';
import MyNavBar from './components/MyNavbar';
import { Container } from 'reactstrap';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/cr" element={<CreateFlight />} />
      {/* <Route path="users" element={<Users />}>
        <Route path="me" element={<OwnUserProfile />} />
        <Route path=":id" element={<UserProfile />} />
      </Route> */}
    </Routes>
  </BrowserRouter>
  );
}
export default App;
