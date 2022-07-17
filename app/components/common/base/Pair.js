import React, { useState, useEffect } from 'react';
import currencyTypes from './../constants/currencyTypes';

export default function Pair(props) {
  const [currency, setCurrency] = useState(undefined);
  const [fiat, setFiat] = useState(undefined);

  useEffect(() => {
    if (props.currency) {
      setCurrency(
        currencyTypes.find(
          (e) => e.symbol.toLowerCase() === props.currency.toLowerCase(),
        ),
      );
    }
    if (props.fiat) {
      setFiat(
        currencyTypes.find(
          (e) => e.symbol.toLowerCase() === props.fiat.toLowerCase(),
        ),
      );
    }
  }, [props.currency, props.fiat]);

  return currency ? (
    props.onlyName ? (
      currency.symbol.toUpperCase()
    ) : props.onlyIcon ? (
      <div className="w-8 h-8 flex items-center justify-center">
        {currency.icon}
      </div>
    ) : (
      <div className="flex justify-start">
        <div className="flex">
          <div className="w-8 h-8 flex items-center justify-center">
            {currency.icon}
          </div>
          <div className="w-8 h-8 flex items-center justify-center -ml-2">
            {fiat.icon}
          </div>
        </div>
        <div className="h-8 flex items-center justify-start pl-2 whitespace-nowrap">
          {`${currency.symbol.toUpperCase()}/${fiat.symbol.toUpperCase()}`}
        </div>
      </div>
    )
  ) : null;
}
