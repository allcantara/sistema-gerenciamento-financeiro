import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";

const headCells = [
  { id: 1, numeric: false, label: "Alíquota" },
  { id: 2, numeric: true, label: "Mês/Ano de referência" },
  { id: 3, numeric: true, label: "Valor da venda" },
  { id: 4, numeric: true, label: "Taxa a ser paga" },
  { id: 5, numeric: true, label: "Imposto pago?" },
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
