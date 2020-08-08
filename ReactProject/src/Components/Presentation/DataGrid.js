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
                  if (header !== "Date" && header !== "IP") {
                    props.sortData(header);
                  }
                }}
              >
                {header}
                {header !== "Date" && header !== "IP" && (
                  <span className={"pl-3"}>
                    <FontAwesomeIcon
                      icon={
                        props.sortOrder[header] === "ASC"
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
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.age}</td>
              <td>
                {item.logins.map(l => {
                  return (
                    <div
                      style={{
                        backgroundColor: "#7f7fff",
                        padding: 5,
                        margin: 3
                      }}
                    >
                      {l.date}
                    </div>
                  );
                })}
              </td>
              <td>
                {item.logins.map(l => {
                  return (
                    <div
                      style={{
                        backgroundColor: "#7f7fff",
                        padding: 5,
                        margin: 3
                      }}
                    >
                      {l.ip}
                    </div>
                  );
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    "No Records Found"
  );

export default DataGrid;
