import React, { createContext, useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import {
  TableToolbarComponent,
  TableHeadComponent,
  TableRowComponent,
} from "./components";

export const ProductContext = createContext();

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 40,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: 12,
  },
  table: {
    minWidth: 500,
  },
  th: {
    cursor: "pointer",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  iconPayment: {
    color: "green",
  },
  iconNotPayment: {
    color: "red",
  },
}));

export default function TableComponent() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [emptyRows, setEmptyRows] = useState(0);

  function createObject(total, date, isTaxes) {
    let object = {};
    let list = rows;
    const tax = 6;
    object.total = total;
    object.date = date;
    object.tax = tax;
    object.taxeSale = total * (tax / 100);
    object.isTaxes = isTaxes;
    list.push(object);
    setRows([...list]);
  }

  useEffect(() => {
    createObject(1200, new Date(), true);
    createObject(1340, new Date(), false);
    createObject(960, new Date(), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  useEffect(() => {
    setEmptyRows(
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
    );
  }, [page, rows.length, rowsPerPage]);

  return (
    <ProductContext.Provider
      value={{
        rows,
        createObject,
      }}
    >
      <div className={classes.root}>
        <Typography className={classes.title} variant="h6" component="div">
          Impostos pagos
        </Typography>
        <Paper className={classes.paper}>
          <TableToolbarComponent />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <TableHeadComponent classes={classes} rowCount={rows.length} />

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRowComponent
                        row={row}
                        key={index}
                        className={classes}
                      />
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Densidade"
        />
      </div>
    </ProductContext.Provider>
  );
}
