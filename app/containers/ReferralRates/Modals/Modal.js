import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { Form } from '../Forms/Form';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Modal = (props) => {
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setId(props.id);

    setOpen(props.open);
  }, [props.id, props.open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted={false}
      maxWidth="xs"
      fullWidth={true}
      onClose={() => props.onClose()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className="rtl right">
        <Form id={id} onCloseAndReload={() => props.onCloseAndReload()} />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
