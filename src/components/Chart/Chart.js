import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import getTime from "../../utilities/getTime";

function Chart({ data }) {
  const [items, setItems] = useState(data.list);


  let temps = items.map(item => item.main.temp);
  temps = temps.slice(0, 10);


  let date = items.map(item => item.dt).slice(0, 9);
  let times = date.map(time => getTime(time));

  useEffect(() => {
    setItems(data.list);
  }, [data]);

  const chart = {
    labels: times,
    datasets: [
      {
        label: `Weather in ${data.city.name}, ${data.city.country}`,
        data: temps,
        backgroundColor: "transparent",
        borderColor: "#ffa500",
        pointBorderColor: "#ffa500",
        pointBackgroundColor: "#ffa500"
      }
    ]
  };

  return (
    data && (
      <div>
        <Line
          options={{
            responsive: true,
            scales: {
              gridLines: {
                display: false
              },
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Temperature in \u00b0C"
                  }
                }
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Time in 24H format"
                  }
                }
              ]
            },
            maintainAspectRatio: true,
            legend: {
              display: false
            },
            title: {
              display: true,
              text: `Weather and forecasts in ${data.city.name}, ${
                data.city.country
              }`,
              fontSize: 18,
              position: "top"
            }
          }}
          data={chart}
        />
      </div>
    )
  );
}

export default Chart;
