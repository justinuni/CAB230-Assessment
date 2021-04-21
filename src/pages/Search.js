import React, { useState, useEffect } from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { Form, FormGroup, Label, Input } from "reactstrap";

import FetchData from "../utils";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

//import Select from 'react-select';
/*
https://react-select.com/home
https://www.npmjs.com/package/react-select
https://www.digitalocean.com/community/tutorials/react-react-select
https://react-bootstrap.github.io/components/dropdowns/
https://react.semantic-ui.com/modules/dropdown/
*/

//https://stackoverflow.com/questions/45007712/bootstrap-4-dropdown-with-search

export default function Search() {
  const columns = [
    { headerName: "Year", field: "year" },
    { headerName: "Rank", field: "rank" },
    { headerName: "Score", field: "score" },
  ];

  const [countries, setCountries] = useState([]);
  // const [country, setCountry] = useState([]);
  const [rowData, setRowData] = useState([]);

  const [chartData, setChartData] = useState([]);

  function FilterResults(country) {
    console.log(country);
    FetchData("rankings", "country=" + country)
      .then((res) => {
        setRowData(res);
        return res;
      })
      .then((res) => {
        let tempData = [];
        console.log(res.length);
        // eslint-disable-next-line for-direction
        for (let i = res.length - 1; i >= 0; i--) {
          tempData.push(res[i]);
          console.log(res[i]);
        }
        console.log(tempData);
        tempData = tempData.map((x) => {
          return {
            year: x.year,
            rank: x.rank,
          };
        });
        console.log(tempData);

        setChartData(tempData);
      });
  }

  useEffect(() => {
    FetchData("countries").then((res) => {
      console.log("data returned");
      console.log(res);
      setCountries(res);
      console.log(countries);
    });
  }, []);
  return (
    <div className="container">
      <div>
        <h2>Search</h2>

        <Form>
          <FormGroup>
            <Label for="test">TestSelect</Label>
            <Input
              type="select"
              name="select"
              id="testSelect"
              onChange={(country) => FilterResults(country.target.value)}
            >
              <option key="all" value=""></option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Form>

        <div
          className="ag-theme-balham"
          style={{
            height: "300px",
            width: "700px",
          }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            paginationPageSize={6}
          />

          <LineChart
            width={400}
            height={400}
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="year" label="Year" />
            <YAxis label="Rank" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            {/* <Line type="monotone" dataKey="year" stroke="#ff7300" yAxisId={0} /> */}
            <Line type="monotone" dataKey="rank" stroke="#387908" yAxisId={0} />
          </LineChart>
        </div>
        {/* <button onClick={ () => GetSearch()}>Get Rankings</button> */}
      </div>
    </div>
  );
}
