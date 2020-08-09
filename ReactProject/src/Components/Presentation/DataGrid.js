import React from "react";
import { Table, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

const getDate = (date) => {
  return date ? moment(date).format('MM-DD-YYYY') : ''
}
const getClassNameForHeader = (header) => {
  const headerToWidthMap = {
    "ID": 'w-10',
    "App Name": 'w-10',
    "Sql Query": 'w-10',
    "Created By": 'w-10',
    "Updated By": 'w-10',
    "Created Date": 'w-10',
    "Updated Date": 'w-10',
    "Created At": 'w-10',
    "Updated At": 'w-10',
  }
  return headerToWidthMap[header];

}
const DataGrid = props =>

  props.userData && props.userData.length ? (
    <Table id={'gridTable'} responsive striped hover className={"mt-2"} >
      <thead>
        <tr
          className={'tableHeader'}
        >

          {props.tableHeaders.map(header => {
            return (
              <th
                style={{ maxHeight: '10px', padding: '7px', 'fontSize': '14px' }}
                onClick={(e, d) => {
                  props.sortData(header);
                }}
              >
                {header}
                {(
                  <span className={"pl-3"}>
                    <FontAwesomeIcon
                      icon={
                        props.sortOrder[header] === "asc"
                          ? faSortUp
                          : faSortDown
                      }
                    />
                  </span>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody style={{ 'fontSize': '12px' }}>
        {props.userData.map(item => {
          return (
            <tr>
              <td style={{}}>{item.id}</td>
              <td style={{}}>{item.APPNAME}</td>
              <td style={{}}>{item.SQLQUERY}</td>
              <td style={{}}>{item.CREATEDBY}</td>
              <td style={{}}>{item.UPDATEDBY}</td>
              <td style={{}}>{getDate(item.CREATEDDATE)}</td>
              <td style={{}}>{getDate(item.UPDATEDDATE)}</td>
              <td style={{}}>{getDate(item.createdAt)}</td>
              <td style={{}}>{getDate(item.updatedAt)}</td>
              <td style={{}}> <InputGroup.Radio
                variant="dark"
                aria-label="Radio button for following text input"
                checked={props.selectedItem && props.selectedItem.id === item.id}
                onClick={() => {
                  props.selectRowItem(item.id)
                }}
              /></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
      "No Records Found"
    );

export default DataGrid;
