import "date-fns";
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
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
    marginTop: 5,
  },
}));

function FadeComponent({ handleClose }) {
  const [date, setDate] = useState(new Date());
  const { createObject } = useContext(DashboardContext);
  const [distributor, setDistributor] = useState("");
  const [amount, setAmount] = useState(0);
  const [taxeSale, setTaxeSale] = useState(0);
  const [valueUnitary, setValueUnitary] = useState(0);
  const classes = useStyles();

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSave = () => {
    createObject(
      distributor,
      valueUnitary.replace(",", "."),
      amount,
      taxeSale,
      date
    );
    handleClose();
  };

  return (
    <>
      <div className={classes.inputs}>
        <div>
          <TextField
            className={classes.input}
            label="Distribuidor"
            value={distributor}
            onChange={(e) => setDistributor(e.target.value)}
          />
          <TextField
            className={classes.input}
            label="Taxa do distribuidor(%)"
            value={taxeSale}
            onChange={(e) => setTaxeSale(e.target.value)}
          />
        </div>
        <div>
          <TextField
            className={classes.input}
            label="Valor unitário"
            value={valueUnitary}
            onChange={(e) => setValueUnitary(e.target.value)}
          />
          <TextField
            className={classes.inputFlex}
            label="Quantidade de lotes"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <div className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSave()}
        >
          Cadastrar
        </Button>
      </div>
    </>
  );
}

FadeComponent.propTypes = {
  handleClose: PropTypes.func,
};

export default FadeComponent;
