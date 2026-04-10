import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
};

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/student"
          element={
            <PrivateRoute role="student">
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/faculty"
          element={
            <PrivateRoute role="faculty">
              <FacultyDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <Navigate to={user ? (user.role === "faculty" ? "/faculty" : "/student") : "/login"} />
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={user ? (user.role === "faculty" ? "/faculty" : "/student") : "/login"} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
