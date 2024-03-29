import NavBar from "../nav/NavBar";
import {
  faBookBookmark,
  faCalendarDays,
  faTimeline,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import Subjects from "./Subjects";
import Courses from "./Courses";
import AdminCalendar from "./AdminCalendar";

const Admin = () => {
  // Navbar navigation items
  const navItems = [
    {
      name: "Subjects",
      icon: faBookBookmark,
      path: "subjects",
    },
    {
      name: "Users",
      icon: faUser,
      path: "users",
    },
    {
      name: "Calendar",
      icon: faCalendarDays,
      path: "calendar",
    },
    {
      name: "Courses",
      icon: faTimeline,
      path: "courses",
    },
  ];

  return (
    <section className="home-section">
      <NavBar navItems={navItems} />
      <section className="content-section">
        <Routes>
          <Route path="/users" exact element={<Users />} />
          <Route path="/subjects" exact element={<Subjects />} />
          <Route path="/calendar" exact element={<AdminCalendar />} />
          <Route path="/courses" exact element={<Courses />} />
          <Route path="*" element={<Subjects />} />
        </Routes>
      </section>
    </section>
  );
};

export default Admin;
