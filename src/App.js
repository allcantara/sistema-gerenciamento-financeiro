import React, { createContext, useState, useEffect } from "react";
import { SnackbarProvider } from "notistack";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";

const browserHistory = createBrowserHistory();

export const AppContext = createContext()

export default () => {
  const [nameUser, setNameUser] = useState("")
  const [totalSales, setTotalSales] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  async function updateDashboad() {
    setTotalProducts(300);
    setTotalProfit(500);
    setTotalSales(230);
    setTotalTaxes(120);
  }

  useEffect(() => {
    updateDashboad();
  }, []);

  return (
    <AppContext.Provider value={{
      nameUser,
      setNameUser,
      updateDashboad,
      totalProfit,
      totalProducts,
      totalTaxes,
      totalSales
    }}>
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
  )
}
