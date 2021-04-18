"use strict";

import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      document.querySelector("#everyone").checked = true;
      setRowData(data);
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  const externalFilterChanged = (newValue) => {
    ageType = newValue;
    gridApi.onFilterChanged();
  };

  const isExternalFilterPresent = () => {
    return ageType !== "everyone";
  };

  const doesExternalFilterPass = (node) => {
    switch (ageType) {
      case "below25":
        return node.data.age < 25;
      case "between25and50":
        return node.data.age >= 25 && node.data.age <= 50;
      case "above50":
        return node.data.age > 50;
      case "dateAfter2008":
        return asDate(node.data.date) > new Date(2008, 1, 1);
      default:
        return true;
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="test-container">
        <div className="test-header">
          <label>
            <input
              type="radio"
              name="filter"
              id="everyone"
              onChange={() => externalFilterChanged("everyone")}
            />
            Everyone
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              id="below25"
              onChange={() => externalFilterChanged("below25")}
            />
            Below 25
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              id="between25and50"
              onChange={() => externalFilterChanged("between25and50")}
            />
            Between 25 and 50
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              id="above50"
              onChange={() => externalFilterChanged("above50")}
            />
            Above 50
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              id="dateAfter2008"
              onChange={() => externalFilterChanged("dateAfter2008")}
            />
            After 01/01/2008
          </label>
        </div>
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            defaultColDef={{
              flex: 1,
              minWidth: 120,
              filter: true,
            }}
            animateRows={true}
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={doesExternalFilterPass}
            onGridReady={onGridReady}
            rowData={rowData}
          >
            <AgGridColumn field="athlete" minWidth={180} />
            <AgGridColumn
              field="age"
              filter="agNumberColumnFilter"
              maxWidth={80}
            />
            <AgGridColumn field="country" />
            <AgGridColumn field="year" maxWidth={90} />
            <AgGridColumn
              field="date"
              filter="agDateColumnFilter"
              filterParams={dateFilterParams}
            />
            <AgGridColumn field="gold" filter="agNumberColumnFilter" />
            <AgGridColumn field="silver" filter="agNumberColumnFilter" />
            <AgGridColumn field="bronze" filter="agNumberColumnFilter" />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

var dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var cellDate = asDate(cellValue);
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
};
var ageType = "everyone";
function asDate(dateAsString) {
  var splitFields = dateAsString.split("/");
  return new Date(splitFields[2], splitFields[1], splitFields[0]);
}

render(<GridExample></GridExample>, document.querySelector("#root"));
