import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";

import { MainContext } from "../../Main";

export default () => {
  const { classes, handleDrawerToggle } = useContext(MainContext);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Bruno Alcântara
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
