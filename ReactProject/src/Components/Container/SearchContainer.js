import React, { Component } from "react";
import SearchBar from "../Presentation/SearchBar";
import DataGrid from "../Presentation/DataGrid";
import HelpComponent from "../Presentation/HelpComponent";
import {  searchData } from "../../utils";
import { getData } from "../../Services";

class SearchContainer extends Component {
  constructor() {
    super();
    this.sortData = this.sortData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
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
      filters: [],
      selectedFilter: "",
      showHelpComponent: false
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
  
  filterData() {
    const selectedFilter = this.state.selectedFilter;
    const sortBy = this.state.sortBy;
    const sortKey = this.state.sortOrder[sortBy];
    const queryText = this.state.queryText;
    const intialData = this.state.intialData;
    const searchDataResult = searchData(
      intialData,
      selectedFilter,
      queryText,
      sortKey,
      sortBy
    );
    this.setState({ filteredData: searchDataResult });
  }
  updateQueryText(text, key) {
    if (key === "Enter") {
      this.filterData();
    } else {
      this.setState({
        queryText: text
      });
    }
  }
  onFilterChange(key) {
    this.setState(
      {
        selectedFilter: key
      },
      () => {
        this.filterData();
      }
    );
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
            filters={this.state.filters}
            selectedFilter={this.state.selectedFilter}
            onFilterChange={this.onFilterChange}
            updateQueryText={this.updateQueryText}
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
