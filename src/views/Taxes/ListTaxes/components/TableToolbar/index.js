import "date-fns";
import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import ButtonComponent from "../ButtonComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "100%",
  },
  taxes: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(5),
  }
}));

function TableToolbar() {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  const [taxe, setTaxe] = useState(false)

  const handleDateChange = (date) => {
    setDate(date);
  };

  return (
    <Toolbar className={classes.root}>
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
        <div className={classes.taxes}>
          <Typography >Imposto pago:</Typography>
          <Switch checked={taxe} onChange={() => setTaxe(!taxe)} />
        </div>

      <ButtonComponent />
    </Toolbar>
  );
}

export default TableToolbar;
