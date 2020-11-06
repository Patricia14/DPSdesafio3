import * as React from "react";
import { Link } from "react-router-dom";
import useUser from "../_hooks/useUser";

export default function Home() {
  // import just the isLoggedIn function to check whether or not the user is logged in
  const { isLoggedIn } = useUser();

  return !isLoggedIn() ? (
    <div>
      Usuario no registrado <Link to="/signin">Registrese aquí</Link>
    </div>
  ) : (
    <div>
      Ir a página de usuario <Link to="/user">Aquí</Link>
    </div>
  );
}
