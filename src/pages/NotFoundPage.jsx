import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main className="container page-section text-center">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Back to Home</Link>
    </main>
  );
}

export default NotFoundPage;
