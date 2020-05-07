import React, { createContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import {
  TotalProducts,
  TotalProfit,
  TotalSales,
  TotalTaxes,
  ListProducts,
} from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(4),
  },
}));

export const DashboardContext = createContext();

const Dashboard = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    updateDashboad();
  }, []);

  function createObject(distributor, valueUnitary, amount, taxeSale, date) {
    let object = {};
    let list = rows;
    let valueLote = valueUnitary * 100;
    object.valueLote = valueLote;
    object.total = valueLote * amount;
    object.distributor = distributor;
    object.valueUnitary = valueUnitary;
    object.amount = amount;
    object.taxeSale = taxeSale;
    object.date = date;
    object.isTaxes = false;
    list.push(object);
    setRows([...list]);
  }

  useEffect(() => {
    createObject("Bruno Alcântara", 2, 3, 10, new Date());
    createObject("Ana Caroline", 2, 2, 18.5, new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateDashboad() {
    setTotalProducts(300);
    setTotalProfit(500);
    setTotalSales(230);
    setTotalTaxes(120);
  }

  return (
    <DashboardContext.Provider
      value={{
        rows,
        setRows,
        createObject,
        updateDashboad,
        totalSales,
        totalProducts,
        totalProfit,
        totalTaxes,
      }}
    >
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProducts />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalSales />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalTaxes />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit />
          </Grid>

          {/* Listagem dos produtos comprados */}
          <Grid item xs={12}>
            <ListProducts />
          </Grid>
        </Grid>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
