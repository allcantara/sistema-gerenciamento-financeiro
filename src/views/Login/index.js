import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import "./style.css";

import {AppContext} from '../../App'

export default () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setNameUser } = useContext(AppContext)
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameUser("Bruno Alcântara Context")
    history.push("/dashboard");
  };

  const notificacoes = (message, variant) => {
    enqueueSnackbar(message, {
      variant, // success, error, info, warning...
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      }, // Localização em que a mensagem irá aparecer...
      action: (
        <button
          className="btn btn-default text-light"
          onClick={() => closeSnackbar()}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </button>
      ),
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Seu e-mail..."
          type="text"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="input"
          label="Sua senha secreta..."
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="button"
          type="submit"
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>
        <Button
          className="button"
          type="button"
          variant="contained"
          color="default"
          onClick={() => history.push("/register")}
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
};
