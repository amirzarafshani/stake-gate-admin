import React from 'react';
import { CircularProgress, Button } from '@material-ui/core';


function SubmitButton(props) {
  const { onClick, loading, title, className } = props;
  return (
    <Button type="submit" onClick={onClick} disabled={loading} className={className}>
      {loading && <CircularProgress size={20} />}
      {!loading && title}
    </Button>
  );
}
export default SubmitButton;