import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dashboardService from '../../services/dashboardService';
import { BsPeopleFill } from 'react-icons/bs';
import ProfitChart from './Partials/ProfitChart';

export default function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);

    dashboardService
      .getAll()
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return data ? (
    <React.Fragment>
      <div className="container mx-auto my-5 px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/dashboard/users" className="shortcut-box">
            <span>{`Total Users: ${data.user_count}`}</span>
          </Link>
          <Link to="/dashboard/assets" className="shortcut-box">
            <span>{`Pending Assets: ${data.asset_count}`}</span>
          </Link>
          <Link to="/dashboard/releases" className="shortcut-box">
            <span>{`Pending Releases: ${data.release_count}`}</span>
          </Link>
        </div>
      </div>
      <div className="container mx-auto my-5 px-5">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <Link
            to="/dashboard/assets"
            className="shortcut-box flex flex-col items-center justify-center"
          >
            <span>{`Total Investments:`}</span>
            <span className="!text-green-500 text-2xl font-bold">{`${data.total_investments}`}</span>
          </Link>
          <Link
            to="/dashboard/releases"
            className="shortcut-box flex flex-col items-center justify-center"
          >
            <span>{`Total Releases:`}</span>
            <span className="!text-red-500 text-2xl font-bold">{`${data.total_release}`}</span>
          </Link>
        </div>
      </div>
      <ProfitChart data={data.chart_data} />
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
}
