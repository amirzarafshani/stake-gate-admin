import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Assets and Profits',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export default function ProfitChart(props){
  const [data, setData] = useState(undefined)

  useEffect(() => {
    if (props.data) {
      getData(props.data)
    }
  }, [props.data])

  const getData = (data_) => {


        const chart_data = {
          labels: data_.labels,
          datasets: [
            {
              label: 'Amount',
              data: data_.amounts,
              backgroundColor: 'rgb(0, 170, 160)',
            },
            {
              label: 'Profit',
              data: data_.profits,
              backgroundColor: 'rgb(142, 210, 201)',
            },
          ],
        };

        setData(chart_data)

        console.log(chart_data);

  };

    return (
      <div className="container mx-auto my-5 px-5">
        <div className="container mx-auto my-5 px-5 z-0 border bg-white rounded-lg shadow-md  flex flex-col items-center justify-center p-6 cursor-pointer" >
          {data ? <Bar options={options} data={data} /> : ''}
        </div>
      </div>
    );
}

