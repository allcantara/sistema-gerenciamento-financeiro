import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import "./style.css";

export default () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push("/login");
    console.log("register");
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
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <TextField
          className="input"
          label="Seu primeiro nome"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="input"
          label="Seu sobrenome..."
          variant="outlined"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <TextField
          className="input"
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
          Cadastrar
        </Button>
      </form>
    </div>
  );
};
