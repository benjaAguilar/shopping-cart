import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>Oh no! this route doesnt exist...</h1>
      <Link to={"/"}>Go back to home</Link>
    </div>
  );
}

export default ErrorPage;
