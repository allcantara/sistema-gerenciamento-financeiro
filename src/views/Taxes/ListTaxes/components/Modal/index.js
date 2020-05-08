import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import FadeComponent from "../FadeComponent";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ModalComponent({ open, handleClose, row }) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Dados do registro</h2>
          <FadeComponent handleClose={handleClose} row={row} />
        </div>
      </Fade>
    </Modal>
  );
}

ModalComponent.propTypes = {
  row: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default ModalComponent;
