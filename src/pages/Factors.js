import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Bar } from "react-chartjs-2";

import { FetchFactors } from "../utils";

export default function Factors() {
  const columns = [
    { headerName: "Rank", field: "rank" },
    { headerName: "Country", field: "country" },
    { headerName: "Score", field: "score" },
    { headerName: "Economy", field: "economy" },
    { headerName: "Family", field: "family" },
    { headerName: "Health", field: "health" },
    { headerName: "Freedom", field: "freedom" },
    { headerName: "Generosity", field: "generosity" },
    { headerName: "Trust", field: "trust" },
  ];

  const [rowData, setRowData] = useState([]);
  const years = [2020, 2019, 2018, 2017, 2016, 2015];

  function GetResults(year) {
    FetchFactors(year, "limit=10")
      //fuck off prettier dont attach the then to the previous line
      .then((res) => {
        console.log("data returned");
        console.log(res);
        if (year == "nothing") {
          setRowData([]);
          console.log(year);
          console.log("nothing");
        }
        //cease this behaviour prettier
        else {
          setRowData(res);
        }
      });
  }

  function YearsDropDown() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Input
              type="select"
              name="years"
              id="years"
              onChange={(year) => GetResults(year.target.value)}
            >
              <option key="nothing" value=""></option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Form>
      </div>
    );
  }

  function DataTable() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: "320px",
          width: "905px",
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={false}
          defaultColDef={{
            width: 100,
          }}
        />
      </div>
    );
  }

  function DisplayCharts() {
    const graphTypes = [
      "economy",
      "family",
      "health",
      "freedom",
      "generosity",
      "trust",
    ];

    const options = {
      indexAxis: "y",
      responsive: true,
      scales: {
        x: {
          display: true,
          text: "test",
          align: "center",
        },
      },
      title: {
        display: false,
      },
    };

    console.log(graphTypes);

    let graphs = [];
    if (rowData.length > 1) {
      graphTypes.forEach((dataType) => {
        console.log(dataType);
        let countryData = rowData.map((country) => {
          return {
            country: country["country"],
            data: country[dataType],
          };
        });

        const data = {
          labels: countryData.map((country) => {
            return country["country"];
          }),
          datasets: [
            {
              data: countryData.map((country) => {
                return country["data"];
              }),
            },
          ],
        };

        let graph = () => {
          return (
            <div className="chart">
              <Bar data={data} options={options} />
            </div>
          );
        };

        graphs.push(graph);
      });
    }
    console.log(
      graphs.map((graph, index) => (
        <div key={index}>
          {" "}
          <graph /> {graph}
        </div>
      ))
    );
    return (
      <div>
        {graphs.map((Graph, index) => (
          <div key={index}>
            <Graph />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>Factors</h2>
      {localStorage.getItem("token") !== null ? (
        <div>
          display factors
          <YearsDropDown />
          <DataTable />
          <DisplayCharts />
        </div>
      ) : (
        <div>You must be logged in to access this page.</div>
      )}
    </div>
  );
}
