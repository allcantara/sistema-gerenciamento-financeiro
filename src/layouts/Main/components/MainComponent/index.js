import React, { useContext } from "react";

import { MainContext } from "../../Main";

export default ({ children }) => {
  const { classes } = useContext(MainContext);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  );
};
