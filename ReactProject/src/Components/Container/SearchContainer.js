import React, { Component } from "react";
import SearchBar from "../Presentation/SearchBar";
import DataGrid from "../Presentation/DataGrid";
import { getData } from "../../Services";

class SearchContainer extends Component {
  constructor() {
    super();
    this.sortData = this.sortData.bind(this);
    this.filterByAppName = this.filterByAppName.bind(this);
    this.updateQueryText = this.updateQueryText.bind(this);
    this.state = {
      sortOrder: {
        ID: "asc",
        "App Name": "asc",
        "Sql Query": "asc",
        "Created By": "asc",
        "Updated By": "asc",
        "Created Date": "asc",
        "Updated Date": "asc",
        "Created At": "asc",
        "Updated At": "asc"
      },
      sortBy: "ID",
      intialData: [],
      filteredData: [],
    };
    this.tableHeaders = [
      "ID",
      "App Name",
      "Sql Query",
      "Created By",
      "Updated By",
      "Created Date",
      "Updated Date",
      "Created At",
      "Updated At"
    ];
    this.headersToParamMap = {
      "ID": "ID",
      "App Name": "APPNAME",
      "Sql Query": "SQLQUERY",
      "Created By": "CREATEDBY",
      "Updated By": "UPDATEDBY",
      "Created Date": "CREATEDDATE",
      "Updated Date": "UPDATEDDATE",
      "Created At": "CREATEDAT",
      "Updated At": "UPDATEDAT"

    }
  }
  componentDidMount() {
    getData('/api/query?orderBy=asc-id').then((response) => {
      this.setState({filteredData: response})
    })
  }
  
  filterByAppName() {
    const queryText = this.state.queryText;
    getData(`/api/query?APPNAME=${queryText}&orderBy=asc-ID`).then((response) => {
      this.setState({filteredData: response})
    })
  }
  updateQueryText(text, key) {
    if (key === "Enter") {
      this.filterByAppName();
    } else {
      this.setState({
        queryText: text
      });
    }
  }
 
  sortData(key) {
    const getSortOrder = key => {
      const sortOrder = Object.assign(this.state.sortOrder, {});
      sortOrder[key] = sortOrder[key] === "asc" ? "desc" : "asc";
      return sortOrder;
    };
  
    const sortOrder = getSortOrder(key)
    this.setState({sortOrder}, 
      () => {
        getData(`/api/query?orderBy=${sortOrder[key]}-${this.headersToParamMap[key]}`).then((response) => {
          this.setState({filteredData: response})
        })
      }
      )
   
  }
  render() {
    return (
      <div>
        <div class="d-flex justify-content-center mt-5">
          <SearchBar
            updateQueryText={this.updateQueryText}
            filterByAppName={this.filterByAppName}
          />
        </div>
        <DataGrid
          tableHeaders={this.tableHeaders}
          userData={this.state.filteredData}
          sortOrder={this.state.sortOrder}
          sortBy={this.state.sortBy}
          sortData={this.sortData}
        />
      </div>
    );
  }
}



export default SearchContainer;
