import * as React from "react";
import { auth, google } from "../firebase";

enum INPUTS {
  email,
  password,
}

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorResponse, setErrorResponse] = React.useState("");

  const clearError = () => {
    if (errorResponse != "") {
      setErrorResponse("");
    }
  };
  const updateValue = (
    type: INPUTS,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    clearError();
    switch (type) {
      case INPUTS.email:
        setEmail(e.target.value);
        break;
      case INPUTS.password:
        setPassword(e.target.value);
        break;
    }
  };

  const trySignIn = async () => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      setPassword("");
      switch (err.code) {
        default:
          setErrorResponse("Se ha presentado un error");
      }
    });
  };

  const trySignUp = async () => {
    auth.createUserWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
          setErrorResponse(err.message);
          break;
        default:
          setErrorResponse("Se ha presentado un error");
      }
    });
  };

  const trySignInWithGoogle = async () => {
    auth.signInWithPopup(google).catch((err) => {
      switch (err.code) {
        default:
          setErrorResponse("Se ha presentado un error");
      }
    });
  };

  return (
    <div id="login">
     
    <div id="flex-container" className="sign_in">
    
      <span>Correo electronico:</span>
      <input
        type="text"
        value={email}
        onChange={updateValue.bind(null, INPUTS.email)}
      />
      <span>Contraseña:</span>
      <input
        type="password"
        value={password}
        onChange={updateValue.bind(null, INPUTS.password)}
      />
      <div className="error_response">{errorResponse}</div>
      <button onClick={trySignIn}>Iniciar sesión</button>{" "}
      <button onClick={trySignUp}>Registrarse</button>
      <button onClick={trySignInWithGoogle}>Inicio de sesión con Google</button>
    </div>
    </div>
  );
}
