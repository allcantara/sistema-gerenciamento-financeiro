import React from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ModalComponent from "../Modal/index";

function TableRowComponent({ row, className: classes }) {
  const [open, setOpen] = React.useState(false);

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
          {row.name}
        </TableCell>
        <TableCell align="right">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(row.value)}
        </TableCell>
        <TableCell align="right">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(row.valueLote)}
        </TableCell>
        <TableCell align="right">{row.tax}%</TableCell>
        <TableCell align="right">{row.amount}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(row.final)}
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
