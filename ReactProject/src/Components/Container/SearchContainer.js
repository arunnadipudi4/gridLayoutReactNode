import React, { Component } from "react";
import SearchBar from "../Presentation/SearchBar";
import DataGrid from "../Presentation/DataGrid";
import HelpComponent from "../Presentation/HelpComponent";
import { userData, searchData } from "../../utils";

class SearchContainer extends Component {
  constructor() {
    super();
    this.sortData = this.sortData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.updateQueryText = this.updateQueryText.bind(this);
    this.openHelpComponent = this.openHelpComponent.bind(this);
    this.state = {
      sortOrder: {
        ID: "ASC",
        "First Name": "ASC",
        "Last Name": "ASC",
        Email: "ASC",
        Gender: "ASC",
        Age: "ASC",
        Date: "ASC",
        IP: "ASC"
      },
      sortBy: "ID",
      intialData: userData,
      filteredData: userData,
      filters: [],
      selectedFilter: "",
      showHelpComponent: false
    };
    this.tableHeaders = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Gender",
      "Age",
      "Date",
      "IP"
    ];
  }
  componentDidMount() {
    const userData = this.state.filteredData;
    const dataKeys = Object.keys(userData[0]);
    this.setState({
      filters: ["Select Filter", ...dataKeys, "Date", "IP"].filter(key => {
        return key !== "logins";
      }),
      selectedFilter: "Select Filter"
    });
  }
  openHelpComponent() {
    this.setState({ showHelpComponent: !this.state.showHelpComponent });
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
      sortOrder[key] = sortOrder[key] === "ASC" ? "DESC" : "ASC";
      return sortOrder;
    };
    this.setState(
      {
        sortBy: key,
        sortOrder: getSortOrder(key)
      },
      () => {
        this.filterData();
      }
    );
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
            openHelpComponent={this.openHelpComponent}
          />
        </div>
        <DataGrid
          tableHeaders={this.tableHeaders}
          userData={this.state.filteredData}
          sortOrder={this.state.sortOrder}
          sortBy={this.state.sortBy}
          sortData={this.sortData}
        />
        <HelpComponent
          showHelpComponent={this.state.showHelpComponent}
          openHelpComponent={this.openHelpComponent}
          heading={"USAGE"}
          renderProps={<HelpComponentBody />}
        />
      </div>
    );
  }
}

function HelpComponentBody() {
  // id: ["$like", "$gt", "$lt", "$in", "$range"],
  // first_name: ["$like", "$in"],
  // last_name: ["$like", "$in"],
  // email: ["$like", "$in"],
  // gender: ["$like", "$in"],
  // age: ["$like", "$gt", "$lt", "$in", "$range"],
  // Date: ["$like"],
  // IP: ["$like"]
  return (
    <div>
      <p class="font-weight-bolder">
        {
          "The Data Can be filtered based on all available fields. Certain operations can also be performed based on the selected filter e.g, >,<"
        }
      </p>
      <p class="text-monospace">
        {
          "List of available operations for each filter NOTE: all the operations are mapped to below operators ($gt : >) ($lt : <) ($in : ,) ($range : -)"
        }
      </p>
      <div className={"container border bg-light"}>
        <div className={"row"}>
          <div className={"col-4"}>'ID'</div>
          <div className={"col-8"}>"$like", "$gt", "$lt", "$in", "$range"</div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>'First Name'</div>
          <div className={"col-8"}>"$like", "$in"</div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>'Last Name'</div>
          <div className={"col-8"}>"$like", "$in"</div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>'email'</div>
          <div className={"col-8"}>"$like", "$in"</div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>'age'</div>
          <div className={"col-8"}>"$like", "$gt", "$lt", "$in", "$range"</div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>'gender'</div>
          <div className={"col-8"}>"$like", "$in"</div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>'Date'</div>
          <div className={"col-8"}>"$like"</div>
        </div>
        <div className={"row"}>
          <div className={"col-4"}>'IP'</div>
          <div className={"col-8"}>"$like"</div>
        </div>
      </div>
    </div>
  );
}

export default SearchContainer;
