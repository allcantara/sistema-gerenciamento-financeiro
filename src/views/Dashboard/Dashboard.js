import React from "react";
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

const Dashboard = () => {
  const classes = useStyles();

  return (
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
  );
};

export default Dashboard;
