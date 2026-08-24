import { Link } from "react-router";

function UnauthorizedPage() {
  return (
    <main className="container page-section text-center">
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/">Back to Home</Link>
    </main>
  );
}

export default UnauthorizedPage;
