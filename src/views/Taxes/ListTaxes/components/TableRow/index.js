import React from "react";
import PropTypes from "prop-types";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ModalComponent from "../Modal/index";
import { listMonths } from "../utils";

function TableRowComponent({ row, className: classes }) {
  const [open, setOpen] = React.useState(false);
  let [{ month }] = listMonths.filter(
    (item) => item.number - 1 === new Date(row.date).getMonth()
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isTaxesPayment = (value) => {
    return value ? (
      <CheckIcon className={classes.iconPayment} />
    ) : (
      <CloseIcon className={classes.iconNotPayment} />
    );
  };

  return (
    <>
      <TableRow
        hover
        onClick={() => handleOpen()}
        tabIndex={-1}
        className={classes.th}
      >
        <TableCell align="left">{`${row.tax}%`}</TableCell>
        <TableCell align="right">
          {`${month}/${new Date(row.date).getFullYear()}`}
        </TableCell>
        <TableCell align="right">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(row.total)}
        </TableCell>
        <TableCell align="right">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(row.taxeSale)}
        </TableCell>
        <TableCell align="right">{isTaxesPayment(row.isTaxes)}</TableCell>
      </TableRow>
      <ModalComponent
        open={open}
        row={row}
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
