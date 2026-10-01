import { Navigate, Outlet, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./ui/Button";
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

function ProtectedRoute() {
  const location = useLocation();

<<<<<<< HEAD
  const { user, loading, error, restoreSession, logout } = useAuth();
  if (loading) return <LoadingSpinner label="Checking your session..." />;
  if (error) return (
    <main className="ui-page" style={{ padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <p role="alert">{error}</p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="primary" onClick={restoreSession}>Retry</Button>
        <Button variant="outline" onClick={logout}>Back to login</Button>
      </div>
    </main>
  );

  if (!user) {
=======
  const isLoggedIn =
    localStorage.getItem("transporter_logged_in") === "true";

  if (!isLoggedIn) {
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

<<<<<<< HEAD
export default ProtectedRoute;
=======
export default ProtectedRoute;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
