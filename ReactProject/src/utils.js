import _ from "lodash";
import moment from "moment";

export const baseURL = 'http://localhost:8080'


export const filterKeyToName = {
  id: "ID",
  first_name: "First Name",
  last_name: "Last Name",
  email: "Email",
  gender: "Gender",
  age: "Age",
  Date: "Date",
  IP: "IP"
};
function availableOperations() {
  return {
    id: ["$like", "$gt", "$lt", "$in", "$range"],
    first_name: ["$like", "$in"],
    last_name: ["$like", "$in"],
    email: ["$like", "$in"],
    gender: ["$like", "$in"],
    age: ["$like", "$gt", "$lt", "$in", "$range"],
    Date: ["$like"],
    IP: ["$like"]
  };
}
function sortData(data, order, key) {
  const filterNameToKey = {
    ID: "id",
    "First Name": "first_name",
    "Last Name": "last_name",
    Email: "email",
    Gender: "gender",
    Age: "age",
    Date: "Date",
    IP: "IP"
  };
  const sortedData = _.orderBy(data, [filterNameToKey[key]], [order]);
  return sortedData;
}
function applyOperation(data, filter, operation, opValues) {
  switch (operation.toLowerCase()) {
    case "$in": {
      return data.filter(item => opValues.includes(item[filter].toString()));
    }
    case "$like": {
      let regex = new RegExp(opValues);
      return data.filter(item => item[filter].toString().match(regex));
    }
    case "$gt": {
      return data.filter(item => item[filter] > opValues);
    }
    case "$lt": {
      return data.filter(item => item[filter] < opValues);
    }
    case "$range": {
      return data.filter(
        item => item[filter] >= opValues[0] && item[filter] <= opValues[1]
      );
    }
    default:
      return data;
  }
}

function filterByDate(data, query) {
  const filters = Object.keys(query);
  let finalData = [];
  filters.forEach(filter => {
    if (filter.toLowerCase() !== "$sort") {
      let opObj = query[filter] ? query[filter] : "";
      let operations = Object.keys(opObj)[0];
      if (availableOperations()[filter].includes(operations)) {
        finalData = data.filter(d =>
          d.logins.some(login =>
            new moment(login.date).isSame(opObj[operations])
          )
        );
      } else {
        finalData = data;
      }
    }
  });
  return finalData;
}

function filterByIP(data, query) {
  const filters = Object.keys(query);
  let finalData = [];
  filters.forEach(filter => {
    if (filter.toLowerCase() !== "$sort") {
      let opObj = query[filter] ? query[filter] : "";
      let operations = Object.keys(opObj)[0];
      if (availableOperations()[filter].includes(operations)) {
        finalData = data.filter(d =>
          d.logins.some(login => login.ip.match(new RegExp(opObj[operations])))
        );
      } else {
        finalData = data;
      }
    }
  });
  return finalData;
}
function search(data, queryObj) {
  const filters = Object.keys(queryObj);
  let filteredResult = [];
  let sortBy = "";
  let sortByKey = "";
  filters.forEach(filter => {
    if (filter === "Date") {
      filteredResult = filterByDate(data, queryObj);
    } else if (filter === "IP") {
      filteredResult = filterByIP(data, queryObj);
    } else if (filter.toLowerCase() !== "$sort") {
      let opObj = queryObj[filter] ? queryObj[filter] : "";

      if (opObj === "") {
        filteredResult = data.slice();
      } else {
        let operations = Object.keys(opObj);
        if (availableOperations()[filter].includes(operations[0])) {
          filteredResult = operations.reduce((inital, operation, index) => {
            let operationValues = opObj[operation];
            return applyOperation(inital, filter, operation, operationValues);
          }, data);
        } else {
          filteredResult = data;
        }
      }
    } else {
      let sortByObj = queryObj[filter] ? queryObj[filter] : "";
      sortBy = sortByObj[0];
      sortByKey = sortByObj[1];
    }
  });
  filteredResult = sortData(filteredResult, sortByKey.toLowerCase(), sortBy);
  return filteredResult;
}
function buildQueryObj(searchText, filter, sortKey, sortBy) {
  let query = {};
  let keywords;
  if (searchText.includes(",")) {
    keywords = searchText.split(",");
    keywords = keywords.map(word => word.trim());
    query[filter] = { $in: keywords };
  } else if (searchText.includes(">")) {
    keywords = searchText.split(">")[1].trim();
    query[filter] = { $gt: keywords };
  } else if (searchText.indexOf("<") > -1) {
    keywords = searchText.split("<")[1].trim();
    query[filter] = { $lt: keywords };
  } else if (searchText.indexOf("-") > -1) {
    keywords = searchText.split("-");
    query[filter] = { $range: keywords };
  } else {
    keywords = searchText.trim();
    query[filter] = { $like: keywords };
  }
  query.$sort = [sortBy, sortKey];
  return query;
}
export const searchData = (
  data,
  selectedFilter,
  queryText,
  sortKey,
  sortBy
) => {
  console.log(selectedFilter);
  if (!(queryText && queryText.length) || selectedFilter === "Select Filter") {
    return sortData(data, sortKey.toLowerCase(), sortBy);
  }
  const QueryObj = buildQueryObj(
    queryText,
    selectedFilter,
    sortKey.toLowerCase(),
    sortBy
  );
  const searchData = search(data, QueryObj);
  return searchData;
};
