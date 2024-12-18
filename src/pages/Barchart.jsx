
// import { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// export default function Barchart(){
//   const [bar, setBar] = useState({
//     series: [
//         { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
//         { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
//         { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41],  colors:'indigo'}
//     ],
//     options: {
//         chart: {
//             type: 'bar',
//             height: 350,
//             colors: ['indigo']
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 columnWidth: '55%',
//                 endingShape: 'rounded'
//             },
//         },
//         dataLabels: {
//             enabled: false
//         },
//         stroke: {
//             show: true,
//             width: 2,
//             colors: ['transparent']
//         },
//         xaxis: {
//             categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
//         },
//         yaxis: {
//             title: {
//                 text: '$ (thousands)'
//             }
//         },
//         fill: {
//             opacity: 1,
//         },
//         tooltip: {
//             y: {
//                 formatter: function (val) {
//                     return "$ " + val + " thousands"
//                 }
//             }
//         }
//     }
//   });
//   return(
//     <>
// <ReactApexChart style={{color:"red"}} options={bar.options} series={bar.series} type="bar" height={350} />
//     </>
//   )
// }

import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Barchart = () => {
  // Sample data for the stacked column chart
  const chartData = {
    series: [
      {
        name: 'Accepted',
        data: [14, 25, 21, 17, 15, 3, 7, 9, 12, 18, 57, 44],
        colors: "#0b4170"
      },
      {
        name: 'Rejected',
        data: [20, 10, 20, 10, 14, 50, 20, 1, 2, 54, 1, 2],
      },
      {
        name: 'Partial',
        data: [10, 20, 15, 10, 25, , 35, 45, 20, 10, 10, 20],
      },
      {
        name: 'Pending',
        data: [10, 20, 15, 10, 25, , 35, 45, 20, 10, 10, 20],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: ['january', 'febuary', 'March', 'April', 'May', "june", "july", "August", 'September', 'October', 'November', 'December'],
      },
      legend: {
        position: 'top',
      },
      fill: {
        opacity: 1,
        // colors:"#0b4170"
      },
    },
  };

  return (
    <>
      <div>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
          width="100%"
        />
      </div>
      <h3 className='text-center'>Count of Status</h3>
    </>
  );
};

export default Barchart;