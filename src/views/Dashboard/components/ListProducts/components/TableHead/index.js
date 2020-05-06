import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";

const headCells = [
  { id: 1, numeric: false, label: "Distribuidor" },
  { id: 2, numeric: true, label: "Valor unitário" },
  { id: 3, numeric: true, label: "Valor do lote" },
  { id: 4, numeric: true, label: "Alíquota de marca" },
  { id: 5, numeric: true, label: "Quantidade comprado" },
  { id: 6, numeric: true, label: "Data da compra" },
  { id: 7, numeric: true, label: "Total a ser pago" },
];

function TableHeadComponent(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding="default"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeadComponent;
