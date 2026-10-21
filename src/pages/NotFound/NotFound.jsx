import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={css.page}>
      <h1 className={css.code}>404</h1>
      <h2 className={css.title}>Page Not Found</h2>
      <p className={css.subtitle}>
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className={css.button}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
