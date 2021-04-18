import React, { useState, useEffect } from "react";
//import Select from 'react-select';
/*
https://react-select.com/home
https://www.npmjs.com/package/react-select
https://www.digitalocean.com/community/tutorials/react-react-select
https://react-bootstrap.github.io/components/dropdowns/
https://react.semantic-ui.com/modules/dropdown/
*/

//https://stackoverflow.com/questions/45007712/bootstrap-4-dropdown-with-search
import FetchData from "../utils";

export default function Search() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    FetchData("countries").then((res) => {
      console.log("data returned");
      console.log(res);
      setCountries(res);
      console.log(countries);
    });
  }, []);
  return (
    <div>
      <h2>Search</h2>
      {/* <button onClick={ () => GetSearch()}>Get Rankings</button> */}
    </div>
  );
}
