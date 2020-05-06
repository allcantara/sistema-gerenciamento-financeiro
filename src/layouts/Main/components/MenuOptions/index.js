import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import DashboardIcon from "@material-ui/icons/Dashboard";

import { MainContext } from "../../Main";

export default () => {
  const { classes } = useContext(MainContext);
  const history = useHistory();

  const navigationList = [
    {
      route: "Início",
      redirect: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      route: "Impostos",
      redirect: "/taxes",
      icon: <StarIcon />,
    },
  ];

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {navigationList.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => history.push(item.redirect)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.route} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};
