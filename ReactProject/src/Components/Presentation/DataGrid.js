import React from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

const DataGrid = props =>
  props.userData && props.userData.length ? (
    <Table responsive variant="dark" striped bordered hover className={"mt-5"}>
      <thead>
        <tr>
          {props.tableHeaders.map(header => {
            return (
              <th
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
      <tbody>
        {props.userData.map(item => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{item.APPNAME}</td>
              <td>{item.SQLQUERY}</td>
              <td>{item.CREATEDBY}</td>
              <td>{item.UPDATEDBY}</td>
              <td>{item.CREATEDDATE}</td>
              <td>{item.UPDATEDDATE}</td>
              <td>{item.createdAt}</td>
              <td>{item.updatedAt}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    "No Records Found"
  );

export default DataGrid;
