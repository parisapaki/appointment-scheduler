import { Routes, Route } from "react-router-dom";
import AppointmentList from "./components/AppointmentList";
import Service from "./components/Service";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppointmentList />} />
      <Route path="/appointment/:id" element={<Service />} />
    </Routes>
  );
}
