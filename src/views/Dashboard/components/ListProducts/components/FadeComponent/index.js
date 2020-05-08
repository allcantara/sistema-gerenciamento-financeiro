import "date-fns";
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import api from "../../../../../../services/api";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { DashboardContext } from "../../../../Dashboard";

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
    marginTop: 10,
  },
}));

function FadeComponent({ product: item, handleClose }) {
  const { showMessage, updateDashboad, getListSales } = useContext(
    DashboardContext
  );
  const [date, setDate] = useState(new Date());
  const [distributor, setDistributor] = useState("");
  const [amount, setAmount] = useState(0);
  const [taxeSale, setTaxeSale] = useState("");
  const [valueUnitary, setValueUnitary] = useState("");
  const [isTaxes, setIsTaxes] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setDate(item.date);
    setDistributor(item.distributor);
    setTaxeSale(String(item.taxeSale).replace(".", ","));
    setValueUnitary(String(item.valueUnitary.toFixed(2)).replace(".", ","));
    setAmount(item.amount);
    setIsTaxes(item.isTaxes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = (d) => {
    setDate(d);
  };

  const handleSave = async () => {
    try {
      const data = {
        user_id: item.user_id,
        isTaxes,
        distributor,
        valueUnitary,
        amount,
        taxeSale,
        date,
      };
      const response = await api.put(`/sales/${item._id}`, data);
      if (response.status !== 200) {
        showMessage("Falha ao atualizar!", "warning");
        handleClose();
        return;
      }

      showMessage("Venda atualizada com sucesso!", "success");
      updateDashboad();
      getListSales();
      handleClose();
    } catch (error) {
      console.log(error);
      showMessage("Falha ao atualizar!", "error");
      handleClose();
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/sales/${item._id}`);

      if (response.status === 202) {
        showMessage(response.data.message, "warning");
        handleClose();
        return;
      }
      if (response.status !== 200) {
        showMessage("Falha ao excluir!", "warning");
        handleClose();
        return;
      }

      showMessage("Venda excluída!", "success");
      updateDashboad();
      getListSales();
      handleClose();
    } catch (error) {
      console.log(error);
      showMessage("Falha ao excluir!", "error");
      handleClose();
    }
  };

  return (
    <>
      <div className={classes.inputs}>
        <div>
          <TextField
            className={classes.input}
            label="Distribuidor"
            value={distributor}
            disabled
          />
          <TextField
            className={classes.input}
            label="Taxa do distribuidor(%)"
            value={`${taxeSale}%`}
            disabled
          />
        </div>
        <div>
          <TextField
            className={classes.input}
            label="Valor unitário"
            value={`R$ ${valueUnitary}`}
            disabled
          />
          <TextField
            className={classes.inputFlex}
            label="Quantidade de lotes"
            value={amount}
            disabled
          />
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              id="date-picker-inline"
              label="Data da compra"
              value={date}
              disabled
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <div className={classes.switch}>
            <Typography>Marcar taxa do distribuidor como paga:</Typography>
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
