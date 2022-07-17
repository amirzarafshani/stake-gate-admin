import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Assets from '../Tabs/Assets';
import Releases from '../Tabs/Releases';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Modal = (props) => {
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setId(props.id);

    setOpen(props.open);
  }, [props.id, props.open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted={false}
      maxWidth="lg"
      fullWidth={true}
      onClose={() => props.onClose()}
    >
      <DialogContent className="rtl right bg-gray-100">
        <div className="flex flex-col">
          <div className="flex items-center border-b border-gray-500 pb-4 mb-4">
            {tabTitles.map((item, index) => (
              <a
                key={`user-modal-tabs-${item}`}
                className={`disabled:!bg-gray-300 disabled:cursor-default overflow-hidden relative outline-none focus:outline-none bg-primary shadow-lg rounded-md px-1 md:px-5 py-0 md:py-2 cursor-pointer m-0.5 hover:bg-primary-dark whitespace-nowrap text-sm md:text-base ${tab === index
                  ? 'bg-secondary text-white hover:bg-secondary cursor-default'
                  : ''
                  }`}
                onClick={() => setTab(index)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {tab === 0 && <Assets id={id} />}
        {tab === 1 && <Releases id={id} />}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

const tabTitles = [
  'Assets',
  'Releases',
];
