import React, { createContext, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import {
  TotalProducts,
  TotalProfit,
  TotalSales,
  TotalTaxes,
  ListProducts,
} from "./components";

import api from "../../services/api";

import { AppContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(4),
  },
}));

export const DashboardContext = createContext();

const Dashboard = () => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);

  const {
    updateDashboad,
    totalSales,
    totalTaxes,
    totalProducts,
    totalProfit,
  } = useContext(AppContext);

  async function createObject(
    distributor,
    valueUnitary,
    amount,
    taxeSale,
    date
  ) {
    try {
      const data = {
        user_id: getUserId(),
        distributor,
        valueUnitary,
        amount,
        taxeSale,
        date,
      };
      const response = await api.post("/sales", data);
      if (response.status !== 200) {
        showMessage("Falha ao listar as vendas!", "warning");
        return;
      }

      setRows([...rows, response.data._doc]);
      updateDashboad();
    } catch (error) {
      console.log(error);
      showMessage("Ocorreu um erro na requisição!", "error");
      return;
    }
  }

  async function getListSales() {
    try {
      const response = await api.get(`/sales?user=${getUserId()}`);
      if (response.status !== 200) {
        showMessage("Falha ao listar as vendas!", "warning");
        return;
      }

      setRows([...response.data]);
    } catch (error) {
      console.log(error);
      showMessage("Ocorreu um erro na requisição!", "warning");
      return;
    }
  }

  function getUserId() {
    return localStorage.getItem("ID_USER");
  }

  useEffect(() => {
    updateDashboad();
    getListSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showMessage = (message, variant) => {
    enqueueSnackbar(message, {
      variant, // success, error, info, warning...
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      }, // Localização em que a mensagem irá aparecer...
      action: (
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
          }}
          onClick={() => closeSnackbar()}
        >
          <FontAwesomeIcon icon={faWindowClose} color="#fff" />
        </button>
      ),
    });
  };

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
        showMessage,
        getListSales,
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
