import React, { Component } from "react";
import { Button, Container, Row } from 'react-bootstrap';
import SearchBar from "../Presentation/SearchBar";
import DataGrid from "../Presentation/DataGrid";
import { getData, postData, deleteData } from "../../Services";
import AddRow from '../Presentation/AddRow';

class SearchContainer extends Component {
  constructor() {
    super();
    this.sortData = this.sortData.bind(this);
    this.filterByAppName = this.filterByAppName.bind(this);
    this.updateQueryText = this.updateQueryText.bind(this);
    this.openAddRowModal = this.openAddRowModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateInputText = this.updateInputText.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.selectRowItem = this.selectRowItem.bind(this);
    this.deleteSelectedRow = this.deleteSelectedRow.bind(this);
    this.state = {
      sortOrder: {
        ID: "asc",
        "App Name": "asc",
        "SQL Query": "asc",
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
      show: false,
      inputRowData: {
        'APPNAME': '',
        'SQLQUERY': '',
        'CREATEDBY': '',
        'UPDATEDBY': ''
      },
      selectedItem: null
    };
    this.tableHeaders = [
      "ID",
      "App Name",
      "SQL Query",
      "Created By",
      "Updated By",
      "Created Date",
      "Updated Date",
      "Created At",
      "Updated At",
      "select"
    ];
    this.headersToParamMap = {
      "ID": "ID",
      "App Name": "APPNAME",
      "SQL Query": "SQLQUERY",
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
      this.setState({ filteredData: response })
    })
  }

  filterByAppName() {
    const queryText = this.state.queryText;
    getData(`/api/query?APPNAME=${queryText}&orderBy=asc-ID`).then((response) => {
      this.setState({ filteredData: response })
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
    this.setState({ sortOrder },
      () => {
        getData(`/api/query?orderBy=${sortOrder[key]}-${this.headersToParamMap[key]}`).then((response) => {
          this.setState({ filteredData: response })
        })
      }
    )

  }

  openAddRowModal() {
    this.setState({ show: true })
  }
  handleClose() {
    this.setState({ show: false })
  }
  updateInputText(value, id) {
    const inputRowData = this.state.inputRowData;
    inputRowData[id] = value;
    this.setState({ inputRowData });
  }
  handleSaveChanges() {
    const inputRowData = this.state.inputRowData;
    const paramObj = {
      "APPNAME": inputRowData.APPNAME,
      "SQLQUERY": inputRowData.SQLQUERY,
      "UPDATEDDATE": "",
      "CREATEDBY": inputRowData.CREATEDBY,
      "UPDATEDBY": inputRowData.UPDATEDBY
    }
    postData('/api/query', paramObj).then((response) => {
      getData('/api/query?orderBy=asc-id').then((res) => {
        this.setState({ filteredData: res }, () => {
          this.setState({ inputRowData: {}, show: false })
        })
      })
    })
  }
  selectRowItem(id) {
    const filteredData = this.state.filteredData;
    const selectedItem = filteredData.find((item) => {
      return item.id === id;
    });
    if (selectedItem) {
      this.setState({ selectedItem })
    } else alert('no item found')

  }
  deleteSelectedRow() {
    const selectedItem = this.state.selectedItem;
    if (selectedItem) {
      const id = selectedItem.id;
      deleteData(`/api/query/${id}`).then((response) => {
        getData('/api/query?orderBy=asc-id').then((res) => {
          this.setState({ filteredData: res })
        })
      })
    } else {
      alert('no item found')
    }
  }
  render() {
    return (
      <div>

        <Container className={'container-fluid'}>
          <Row className={'d-flex justify-content-center m-2'}>
            <SearchBar
              updateQueryText={this.updateQueryText}
              filterByAppName={this.filterByAppName}
            />
          </Row>
          <Row className={'d-flex justify-content-center'}>

            <Button
              className={'mr-1'}
              title={'Add a Row'}
              variant={"primary"}
              onClick={() => this.openAddRowModal()}
              style={{
                'borderRadius': 0,
                'background': '#fbce07',
                'border': 'none',
                'color': 'black',
                'fontSize': '12px',
                'width': '150px',
                'padding': '10px'
              }}
            > {'Add a Row'}

            </Button>

            <Button
              className={'mr-1'}
              title={'Delete Table'}
              variant={"primary"}
              onClick={() => this.filterByAppName()}
              style={{
                'borderRadius': 0,
                'background': '#fbce07',
                'border': 'none',
                'color': 'black',
                'fontSize': '12px',
                'width': '150px',
                'padding': '10px'
              }}
            > {'Delete Table'}
            </Button>
            <Button
              className={'mr-1'}
              title={'Edit Selected Row'}
              variant={"primary"}
              onClick={() => this.filterByAppName()}
              style={{
                'borderRadius': 0,
                'background': '#fbce07',
                'border': 'none',
                'color': 'black',
                'fontSize': '12px',
                'width': '150px',
                'padding': '10px'
              }}
            > {'Edit Selected Row'}
            </Button>
            <Button
              className={'mr-1'}
              title={'Delete Selected Row'}
              variant={"primary"}
              onClick={() => this.deleteSelectedRow()}
              style={{
                'borderRadius': 0,
                'background': '#fbce07',
                'border': 'none',
                'color': 'black',
                'fontSize': '12px',
                'width': '150px',
                'padding': '10px'
              }}
            > {'Delete Selected Row'}
            </Button>
          </Row>

        </Container>
        <DataGrid
              tableHeaders={this.tableHeaders}
              userData={this.state.filteredData}
              sortOrder={this.state.sortOrder}
              sortBy={this.state.sortBy}
              sortData={this.sortData}
              selectRowItem={this.selectRowItem}
              selectedItem={this.state.selectedItem}
            />
        <AddRow
          show={this.state.show}
          handleClose={this.handleClose}
          handleSaveChanges={this.handleSaveChanges}
          updateInputText={this.updateInputText}
          inputRowData={this.state.inputRowData}
        />

      </div>
    );
  }
}



export default SearchContainer;
