import React, { useState, useEffect } from "react";
import FetchData from "../utils";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { Form, FormGroup, Label, Input } from "reactstrap";

// function test(e) {
//   console.log("test");
//   console.log(e);
// }

export default function Rankings() {
  const columns = [
    { headerName: "Rank", field: "rank", sortable: true },
    { headerName: "Country", field: "country", sortable: true, filter: true },
    {
      headerName: "Score",
      field: "score",
      sortable: true,
      filter: "agNumberColumnFilter",
    },
  ];

  const [rowData, setRowData] = useState([]);
  // const [rowMaster, setRowMaster] = useState([]);

  const [years, setYears] = useState([]);

  // //i hate myself for implementing it like this.
  // //there must be a more elegant way to go about this
  // function FilterResults(year) {
  //   console.log(year);
  //   let tempResults;
  //   if (year != "all") {
  //     tempResults = rowMaster.filter((row) => {
  //       if (row.year == year) {
  //         return row;
  //       }
  //     });
  //   } else {
  //     tempResults = rowMaster;
  //   }

  //   console.log(tempResults);
  //   setRowData(tempResults);
  // }

  function FilterResults(year) {
    console.log(year);
    // if(year == "all")
    FetchData("rankings", "year=" + year)
      .then((res) => {
        console.log("year data returned");
        console.log(res);
        setRowData(res);
      })
      .catch((err) => console.log("error: " + err));
  }

  useEffect(() => {
    FetchData("rankings")
      .then((res) => {
        console.log("data returned");
        console.log(res);
        setRowData(res);
        // setRowMaster(res);
        return res;
      })
      .then((res) => {
        let tempYear = res.map((x) => {
          return x.year;
        });
        let uniqueYears = [...new Set(tempYear)];

        console.log("unique Years");
        console.log(tempYear);
        console.log(uniqueYears);

        setYears(uniqueYears); //sort these are well
      })
      //we need to add in error cases displayed to the user
      .catch((err) => console.log("error: " + err));
  }, []);

  //rank, country, score
  return (
    <div className="container">
      <h2>Rankings</h2>

      <Form>
        <FormGroup>
          <Label for="test">TestSelect</Label>
          <Input
            type="select"
            name="select"
            id="testSelect"
            onChange={(year) => FilterResults(year.target.value)}
          >
            <option key="all" value=""></option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
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
          pagination={true}
          paginationPageSize={8}
        />
      </div>
    </div>
  );
}
