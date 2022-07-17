import React, { useState, useEffect } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = (props) => {
  const { onClose, title, text, open, onConfirm, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onConfirm();
  };

  return (
    <Dialog
      className="confirmation-dialog"
      TransitionComponent={Transition}
      onClose={handleCancel}
      maxWidth="md"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#000' }}>
          {title}
        </span>
      </DialogTitle>
      <DialogContent dividers>{text}</DialogContent>
      <DialogActions>
        <div className="w-full flex items-center justify-start">
          <button
            type="submit"
            className="btn-primary text-white !w-auto"
            onClick={handleOk}
          >
            Confirm
          </button>
          <button
            type="submit"
            className="btn-primary !bg-red-500 hover:!bg-red-600 text-white !w-auto"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
