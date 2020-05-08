import "date-fns";
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { listMonths } from "../utils";
import api from "../../../../../services/api";

import { ProductContext } from "../../ListProducts";
import { AppContext } from "../../../../../App";

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

function FadeComponent({ row, handleClose }) {
  const { getListTaxes, showMessage } = useContext(ProductContext);
  const { updateDashboad } = useContext(AppContext);
  const date = new Date(row.date);
  const tax = row.tax;
  const total = row.total;
  const taxeSale = row.taxeSale;
  const [isTaxes, setIsTaxes] = useState(row.isTaxes);
  const classes = useStyles();
  let [{ month }] = listMonths.filter(
    (item) => item.number - 1 === new Date(row.date).getMonth()
  );

  const handleSave = async () => {
    try {
      const data = {
        isTaxes,
        sale_id: row.sale_id,
        user_id: row.user_id,
      };
      const response = await api.put(`/taxes/${row._id}`, data);
      if (response.status !== 200) {
        showMessage("Falha ao marcar imposto como pago!", "warning");
        handleClose();
        return;
      }

      showMessage("Imposto marcado como pago!", "success");
      await getListTaxes();
      updateDashboad();
      handleClose();
    } catch (error) {
      console.log(error);
      showMessage("Falha ao marcar imposto como pago!", "error");
      handleClose();
    }
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
            label="Valor da venda"
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
            label="Taxa a ser paga"
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
      </div>
    </>
  );
}

FadeComponent.propTypes = {
  row: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
};

export default FadeComponent;
