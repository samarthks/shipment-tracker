import axios from "axios";

const instance = axios.create({
//  baseURL: "http://localhost:3000"
 baseURL: "http://localhost:3000"

});

const checkUrl = url => {
  const excludedEndpoints = ["login", "register", "track"];

  return !excludedEndpoints.reduce(
    (acc, curr) => acc || url.indexOf(curr) !== -1,
    false
  );
};

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    if (checkUrl(config.url)) {
      config.headers.token = localStorage.getItem("token");
    }

    console.log(
      "axios intercepter  lets seeeeee",
      config,
      checkUrl(config.url)
    );
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
