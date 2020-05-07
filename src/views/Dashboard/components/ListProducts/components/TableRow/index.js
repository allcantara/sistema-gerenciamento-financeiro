import React, { useState } from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ModalComponent from "../Modal/index";
import moment from "moment";

function TableRowComponent({ row, className: classes }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow
        hover
        onClick={() => handleOpen()}
        tabIndex={-1}
        className={classes.th}
      >
        <TableCell component="th" scope="row" padding="default">
          {row.distributor}
        </TableCell>
        <TableCell align="right">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(row.valueUnitary)}
        </TableCell>
        <TableCell align="right">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(row.valueLote)}
        </TableCell>
        <TableCell align="right">{row.taxeSale}%</TableCell>
        <TableCell align="right">{row.amount}</TableCell>
        <TableCell align="right">
          {moment(row.date).locale("pt-br").format("DD/MM/YYYY")}
        </TableCell>
        <TableCell align="right">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(row.total)}
        </TableCell>
      </TableRow>
      <ModalComponent
        open={open}
        product={row}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </>
  );
}

TableRowComponent.propTypes = {
  className: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
};

export default TableRowComponent;
