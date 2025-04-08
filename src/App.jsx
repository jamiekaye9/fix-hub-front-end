import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import AllTickets from './components/AllTickets/AllTickets';
import TicketDetails from './components/TicketDetails/TicketDetails';
import { UserContext } from './contexts/UserContext';
import * as ticketService from './services/ticketService';


const App = () => {
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      const ticketsData = await ticketService.index();
      setTickets(ticketsData);
    }
    if (user) fetchAllTickets();
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />}/>
        {user ? (
          <>
            <Route path='/tickets' element={<AllTickets tickets={tickets} />}/>
            <Route path='/tickets/:ticketId' element={<TicketDetails />}/>
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />}/>
            <Route path='/sign-in' element={<SignInForm />}/>
          </>
        )}
      </Routes>
    </>
  )
}

export default App;
