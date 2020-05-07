import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import MoneyIcon from "@material-ui/icons/Money";

import { DashboardContext } from "../../Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: "#e53935",
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: "#333",
  },
  differenceValue: {
    color: "#333",
    marginRight: 10,
  },
}));

const Budget = (props) => {
  const { className, ...rest } = props;
  const { totalProducts } = useContext(DashboardContext);

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              DESPESAS
            </Typography>
            <Typography variant="h6">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalProducts)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
