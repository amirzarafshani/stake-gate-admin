import React from 'react';

export default function Amount({ data, fraction }) {
  return parseFloat(data).toFixed(fraction);
}
