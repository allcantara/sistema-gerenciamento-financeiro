import React, { createContext, useState } from "react";
import { SnackbarProvider } from "notistack";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import Routes from "./Routes";
import api from "./services/api";

const browserHistory = createBrowserHistory();

export const AppContext = createContext();

export default () => {
  const [nameUser, setNameUser] = useState(localStorage.getItem("NAME_USER"));
  const [totalSales, setTotalSales] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  async function updateDashboad() {
    try {
      const idUser = localStorage.getItem("ID_USER");
      const response = await api.get(`/report/${idUser}`);

      if (response.status !== 200) {
        return false;
      }

      const { data } = response;

      setTotalProfit(data.totalProfit);
      setTotalProducts(data.totalProducts);
      setTotalSales(data.totalSales);
      setTotalTaxes(data.totalTaxes);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <AppContext.Provider
      value={{
        nameUser,
        setNameUser,
        updateDashboad,
        totalProfit,
        totalProducts,
        totalTaxes,
        totalSales,
      }}
    >
      <SnackbarProvider
        maxSnack={2}
        autoHideDuration={2000}
        dense={false}
        preventDuplicate={true}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </SnackbarProvider>
    </AppContext.Provider>
  );
};
