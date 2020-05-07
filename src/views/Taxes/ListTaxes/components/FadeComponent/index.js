import "date-fns";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { listMonths } from "../utils";

const useStyles = makeStyles((theme) => ({
  inputs: {
    display: "grid",
    alignItems: "center",
  },
  input: {
    paddingBottom: 10,
  },
  inputFlex: {
    paddingLeft: 8,
    paddingBottom: 10,
  },
  actions: {
    padding: theme.spacing(2, 0),
  },
  buttonDelete: {
    marginLeft: 8,
  },
  switch: {
    marginTop: 5,
  },
}));

function FadeComponent({ product, handleClose }) {
  const date = product.date;
  const tax = product.tax;
  const total = product.total;
  const taxeSale = product.taxeSale;
  const [isTaxes, setIsTaxes] = useState(product.isTaxes);
  const classes = useStyles();
  let [{ month }] = listMonths.filter(
    (item) => item.number - 1 === product.date.getMonth()
  );

  const handleSave = () => {
    handleClose();
  };

  const handleDelete = () => {
    handleClose();
  };

  return (
    <>
      <div className={classes.inputs}>
        <div>
          <TextField
            className={classes.input}
            label="Alíquota"
            value={`${tax}%`}
            disabled={true}
          />
          <TextField
            className={classes.inputFlex}
            label="Valor das vendas"
            disabled={true}
            value={Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total)}
          />
        </div>
        <div>
          <TextField
            className={classes.input}
            label="Mês/Ano de referência"
            value={`${month}/${date.getFullYear()}`}
            disabled={true}
          />
          <TextField
            className={classes.inputFlex}
            label="Valor a ser pago"
            disabled={true}
            value={Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(taxeSale)}
          />
          <div className={classes.switch}>
            <Typography>Imposto pago?</Typography>
            <Switch checked={isTaxes} onChange={() => setIsTaxes(!isTaxes)} />
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSave()}
        >
          Salvar
        </Button>
        <Button
          className={classes.buttonDelete}
          variant="contained"
          onClick={() => handleDelete()}
        >
          Excluir
        </Button>
      </div>
    </>
  );
}

FadeComponent.propTypes = {
  product: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
};

export default FadeComponent;
