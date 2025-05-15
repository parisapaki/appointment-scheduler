import { Routes, Route } from "react-router-dom";
import AppointmentList from "./components/AppointmentList";
import Appointment from "./components/Appointment";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppointmentList />} />
      <Route path="/appointment/:id" element={<Appointment />} />
    </Routes>
  );
}
