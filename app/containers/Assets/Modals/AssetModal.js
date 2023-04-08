import React, { useState, useEffect, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import EditForm from '../Forms/EditForm';
import config from '../../../config';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AssetModal = React.memo((props) => {
  const { onClose, onCloseAndReload } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (props.open && props.data) {
      console.log(props.data);
      setData({ ...props.data });
    }
    setOpen(props.open);
    return () => {
      setData({});
    };
  }, [props.open, props.data]);

  const handleCloseModal = useCallback(() => {
    onClose();
  }, []);

  const handleCloseAndReload = useCallback(() => {
    onCloseAndReload();
  }, []);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted={false}
      maxWidth="md"
      fullWidth={true}
      onClose={handleCloseModal}
    >
      <DialogContent className="rtl right bg-gray-50 !p-10">
        {data && (
          <div className="flex flex-col">
            <div className="font-bold flex justify-between border-b pb-5 mb-5">
              <span>{`Plan: ${data.plan?.name}`}</span>
              {/* <span> {`Days: ${data.plan?.days}`}</span> */}
              {/* <span> {`Amount: ${data.amount}`}</span> */}
            </div>
            <div className="flex">
              <div className="w-1/2">
                <div className="flex flex-col gap-5">
                  <span>{`Amount: ${data.amount}`}</span>
                  <span>{`Profit: ${data.calculated_profit}`}</span>
                  <span>{`Elapsed: ${data.elapsed}`}</span>
                  {/* <div className="divide-y-2 divide-gray-400"></div> */}
                  <span>{`Total Withdrawable: ${
                    data.amount + data.calculated_profit
                  }`}</span>
                </div>
              </div>
              {/* <div className="w-1/2">
                <div className="flex flex-col gap-5">
                  <span>{`Penalty: ${data.plan?.penalty}`}</span>
                  <span>{`Remaining: ${data.remaining}`}</span>
                  <div className="divide-y-2 divide-blue-200"></div>
                  <span>{`Total Penalty: ${data.calculated_penalty}`}</span>
                </div>
              </div> */}
            </div>
            <div className="border-b border-gray-200 pb-5 my-5"></div>
            <div className="my-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <div
                className={`mt-1 relative rounded-md shadow-sm border border-gray-200 bg-gray-100`}
              >
                <span className="block w-full py-3 pl-3 pr-3 sm:text-sm rounded-md focus:outline-none">
                  {data.amount}
                </span>
              </div>
            </div>
            <div className="my-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Transaction Id
              </label>
              <div
                className={`mt-1 relative rounded-md shadow-sm border border-gray-200 bg-gray-100`}
              >
                <span className="block w-full py-3 pl-3 pr-3 sm:text-sm rounded-md focus:outline-none">
                  {data.transaction_id}
                </span>
              </div>
            </div>
            {data?.image?.url && (
              <div className="my-2">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Transaction Screenshot
                </label>
                <div
                  className={`mt-1 relative rounded-md shadow-sm border border-gray-200`}
                >
                  <span className="block w-full py-3 pl-3 pr-3 sm:text-sm rounded-md focus:outline-none">
                    <a
                      href={`${config.rootUrl}${data?.image?.url}`}
                      target="block"
                    >
                      <img
                        src={`${config.rootUrl}${data?.image?.url}`}
                        className="h-52"
                      />
                    </a>
                  </span>
                </div>
              </div>
            )}
            <EditForm item={data} onSubmit={handleCloseAndReload} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
});

export default AssetModal;
