import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";
import "./style.css";

import { AppContext } from "../../App";

import { login } from "../../services/auth";

export default () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setNameUser } = useContext(AppContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        showMessage("Todos os campos são obrigatórios!", "error");
        return;
      }

      const response = await login(email, password);

      if (response.status === 202) {
        showMessage(response.data.message, "warning");
        return;
      }

      const { token, user } = response.data;
      const { name, surname, _id } = user;

      localStorage.setItem("TOKEN", String(token));
      localStorage.setItem("ID_USER", String(_id));
      localStorage.setItem("NAME_USER", `${name} ${surname}`);
      setNameUser(`${name} ${surname}`);
      history.push("/dashboard");
      return;
    } catch (error) {
      console.log(error);
      showMessage("Falha ao fazer login!", "error");
      return;
    }
  };

  const showMessage = (message, variant) => {
    enqueueSnackbar(message, {
      variant, // success, error, info, warning...
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      }, // Localização em que a mensagem irá aparecer...
      action: (
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
          }}
          onClick={() => closeSnackbar()}
        >
          <FontAwesomeIcon icon={faWindowClose} color="#fff" />
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
