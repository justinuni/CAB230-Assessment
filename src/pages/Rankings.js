import React from "react";
import FetchData from "../utils";

function GetRankings()
{
    FetchData("rankings")
        .then((res) => {
            console.log("data returned")
            console.log(res);
        })
        .catch((err) => console.log("error: " + err))
}

export default function Rankings()
{
    return(
        <div>
            <h2>Rankings</h2>
            <button onClick={ () => GetRankings()}>Get Rankings</button>
        </div>
    )
}