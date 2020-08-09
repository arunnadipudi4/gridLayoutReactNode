import React, { Component } from "react";
import { getData } from "../../Services";
import MultipleGrids from '../Presentation/MultipleGrids'
import DropdownComponent from '../Presentation/DropdownComponent';

class MultipleGridsContainer extends Component {
  constructor() {
    super();
    this.state = {initialData: [], multiplegridsdata: []}
    this.selectAppName = this.selectAppName.bind(this);
    
  }
  componentDidMount() {
    getData('/api/query?orderBy=asc-id').then((response) => {
      this.setState({initialData: response})
    })
  }
  selectAppName(name) {
    getData(`/api/query/appname?APPNAME=${name}`).then((response) => {
        this.setState({multiplegridsdata: response});
    })
  }
  render() {
    return (
      <div>
        <DropdownComponent selectAppName={this.selectAppName} rowData={this.state.initialData} />
        <MultipleGrids multiplegridsdata={this.state.multiplegridsdata}/>
      </div>
    );
  }
}



export default MultipleGridsContainer;
