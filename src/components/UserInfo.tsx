import * as React from "react";
import { Link } from "react-router-dom";
import useUser from "../_hooks/useUser";

export default function UserInfo() {
  const List=()=>{
    return (<ul style={{
      display: "flex",
      justifyContent: "space-between",
      listStyle: "none",
      paddingRight: "10px",
    }}>
      <li><b>{userState.email}</b></li>
      <li><Link to="/logout">Cerrar sesión.</Link></li>
    </ul>);
  }

  const { isLoggedIn, userState } = useUser();
  
  return isLoggedIn() ? (
    <div id="menu">
      <nav
      style={{
        color: "black",
        display: "grid",
        gridTemplateColumns: "50% 50%",
        alignItems: "center",
      }}>
        <h1>Notas estudiantes</h1>
        <List/>
        
      </nav>



    </div>
  ) : (
    <div>
      Usuario no registrad, Registrese aqui <Link to="/signin">here</Link>
    </div>
  );
}
