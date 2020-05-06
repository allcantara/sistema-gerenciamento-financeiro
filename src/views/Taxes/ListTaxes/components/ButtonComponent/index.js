import React from "react";
import Button from "@material-ui/core/Button";

export default () => {


  const handleSearch = () => {
    console.log("Pesquisa")
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleSearch}>
        Filtrar
      </Button>
    </div>
  );
}
