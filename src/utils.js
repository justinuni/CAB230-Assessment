const API_URL = "http://131.181.190.87:3000/";

export function FetchData(apiCall, args) {
  let url = `${API_URL}${apiCall}`;

  if (args) {
    if (Array.isArray(args)) {
      let apiArgs = "";
      for (let i = 0; i < args.length; i++) {
        if (i >= 1) {
          apiArgs += "&" + args[i];
        } else {
          apiArgs += "?" + args[i];
        }
      }
      url += apiArgs;
    } else {
      url += "?" + args;
    }
  }
  console.log("Getting data");
  console.log(url);

  return fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function FetchFactors(year, args) {
  let url = `${API_URL}factors/${year}`;
  let token = localStorage.getItem("token");
  // let headers = {
  //   headers: {
  //     accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  if (args) {
    if (Array.isArray(args)) {
      let apiArgs = "";
      for (let i = 0; i < args.length; i++) {
        if (i >= 1) {
          apiArgs += "&" + args[i];
        } else {
          apiArgs += "?" + args[i];
        }
      }
      url += apiArgs;
    } else {
      url += "?" + args;
    }
  }
  console.log("Getting data");
  console.log(url);
  console.log(localStorage.getItem("token"));

  return fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export function PostData(email, password, postType) {
  let url = API_URL;

  url += "user/" + postType;

  console.log(`posting ${postType}`);

  return fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => res.json());
}
