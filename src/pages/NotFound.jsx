<<<<<<< HEAD
import { Link } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState";

function NotFound() {
  return <main className="not-found-page"><EmptyState icon="pin" title="404 — Page not found" description="This page is unavailable. Return to your dashboard to continue."><Link className="ui-button primary" to="/dashboard">Go to Dashboard</Link></EmptyState></main>;
}

export default NotFound;
=======
function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

export default NotFound;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
