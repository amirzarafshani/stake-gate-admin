import * as React from 'react';
import transactionStatuses from '../../../components/common/constants/transactionStatuses';

export default function TransactionStatusSelect(props) {
  const { onChange, value } = props;

  const handleChange = (val) => {
    onChange(val);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-5">
      {transactionStatuses.map((item, index) => (
        <a
          key={index}
          className={` text-center !w-28 btn-primary ${
            item.value === value ? '' : '!bg-[#fff]'
          }`}
          onClick={() => handleChange(item.value)}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
