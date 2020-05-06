import "date-fns";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

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
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [valueLote, setValueLote] = useState(0);
  const [date, setDate] = useState(new Date());
  const classes = useStyles();

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSave = () => {
    handleClose();
  };

  return (
    <>
      <div className={classes.inputs}>
        <div>
          <TextField
            className={classes.input}
            label="Distribuidor"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className={classes.inputFlex}
            label="Preço do lote"
            value={valueLote}
            onChange={(e) => setValueLote(e.target.value)}
          />
        </div>
        <div>
          <TextField
            className={classes.input}
            label="Valor unitário"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextField
            className={classes.inputFlex}
            label="Quantidade"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
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
