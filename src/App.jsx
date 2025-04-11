import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import AllTickets from "./components/AllTickets/AllTickets";
import TicketDetails from "./components/TicketDetails/TicketDetails";
import TicketForm from "./components/TicketForm/TicketForm";
import { UserContext } from "./contexts/UserContext";
import * as ticketService from "./services/ticketService";
import CommentForm from "./components/CommentForm/CommentForm";
import MyRequests from "./components/MyRequests/MyRequests";
import TicketsAssigned from "./components/TicketsAssigned/TicketsAssigned";

const App = () => {
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const handleAddTicket = async (ticketFormData) => {
    const newTicket = await ticketService.create(ticketFormData);
    setTickets([newTicket, ...tickets]);
    navigate("/tickets");
  };

  useEffect(() => {
    const fetchAllTickets = async () => {
      const ticketsData = await ticketService.index();
      setTickets(ticketsData);
    };
    if (user) fetchAllTickets();
  }, [user]);

  const handleDeleteTicket = async (ticketId) => {
    const deletedTicket = await ticketService.deleteTicket(ticketId);
    setTickets((prev) => prev.filter((ticket) => ticket._id !== ticketId));
    navigate("/tickets");
  };

  const handleUpdateTicket = async (ticketId, ticketFormData) => {
    const updatedTicket = await ticketService.updateTicket(
      ticketId,
      ticketFormData
    );
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket._id === ticketId ? updatedTicket : ticket
      )
    );
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <main className="app">
      <NavBar />
      <section className="app-content">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Landing />} />
          {user ? (
            <>
              <Route
                path="/tickets"
                element={<AllTickets tickets={tickets} />}
              />
              <Route
                path="/tickets/:ticketId"
                element={
                  <TicketDetails handleDeleteTicket={handleDeleteTicket} />
                }
              />
              <Route
                path="/tickets/new"
                element={<TicketForm handleAddTicket={handleAddTicket} />}
              />
              <Route
                path="/tickets/:ticketId/edit"
                element={<TicketForm handleUpdateTicket={handleUpdateTicket} />}
              />
              <Route
                path="/tickets/:ticketId/comments/:commentId/edit"
                element={<CommentForm />}
              />
              <Route
                path="/tickets/my-requests"
                element={<MyRequests tickets={tickets} />}
              />
              <Route
                path="/tickets/tickets-assigned"
                element={<TicketsAssigned tickets={tickets} />}
              />
            </>
          ) : (
            <>
              <Route path="/sign-up" element={<SignUpForm />} />
              <Route path="/sign-in" element={<SignInForm />} />
            </>
          )}
        </Routes>
      </section>
    </main>
  );
};

export default App;
