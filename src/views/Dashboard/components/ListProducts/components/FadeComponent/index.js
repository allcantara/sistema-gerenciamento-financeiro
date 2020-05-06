import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
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

function FadeComponent({ product, handleClose, label, method }) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
            label="Distribuidor"
            value={product.name}
          />
          <TextField
            className={classes.inputFlex}
            label="Preço do lote"
            value={product.valueLote}
          />
        </div>
        <div>
          <TextField
            className={classes.input}
            label="Valor unitário"
            value={product.value}
          />
          <TextField
            className={classes.inputFlex}
            label="Quantidade"
            value={product.amount}
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
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <div className={classes.switch}>
            <Typography>Imposto pago?</Typography>
            <Switch checked={product.isTaxes} onChange={() => {}} />
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
  method: PropTypes.string.isRequired,
};

export default FadeComponent;
