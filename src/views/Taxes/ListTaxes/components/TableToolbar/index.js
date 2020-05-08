import React, { useState, useContext, useEffect } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { ProductContext } from "../../ListProducts";

import { listMonths } from "../utils";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    flex: "100%",
  },
  taxes: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(5),
  },
  margin: {
    marginRight: 10,
  },
}));

function TableToolbar() {
  const classes = useStyles();
  const [month, setMonth] = useState("");
  const [taxe, setTaxe] = useState(false);
  const { rows, setRows } = useContext(ProductContext);
  const [rowsTemp, setRowsTemp] = useState([...rows]);

  useEffect(() => {
    let [monthTemp] = listMonths.filter(
      (item) => item.number - 1 === new Date().getMonth()
    );
    setMonth(monthTemp.month);
  }, []);

  const handleChange = (e) => {
    setMonth(e.target.value);
  };

  const handleSearch = () => {
    let list = [];

    if (rowsTemp.length > 0) {
      list = [...rowsTemp];
    } else {
      setRowsTemp([...rows]);
      list = [...rows];
    }

    const listFilter = list.filter((row) => {
      let [{ number }] = listMonths.filter((item) => item.month === month);
      return (
        row.isTaxes === taxe && new Date(row.date).getMonth() === number - 1
      );
    });
    setRows([...listFilter]);
  };

  return (
    <Toolbar className={classes.root}>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Mês</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={month}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          {listMonths.map((item, index) => (
            <option key={index} value={item.month}>
              {item.month}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <div className={classes.taxes}>
        <Typography>Imposto pago:</Typography>
        <Switch checked={taxe} onChange={() => setTaxe(!taxe)} />
      </div>

      <Button color="primary" variant="contained" onClick={handleSearch}>
        Filtrar
      </Button>
    </Toolbar>
  );
}

export default TableToolbar;
