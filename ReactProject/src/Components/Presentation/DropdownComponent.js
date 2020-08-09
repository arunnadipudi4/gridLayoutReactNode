import React from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';

const DropdownComponent = (props) => {
    const distinctRowData = () => {
        const rowData = [];
        props.rowData.forEach((row) => {
            if(rowData.indexOf(row.APPNAME) === -1) {
                rowData.push(row.APPNAME)
            }
        })
        return rowData;
    }
    return(
        <DropdownButton
        title={'Select App Name'}
        variant={"primary"}
        id={`dropdown-variants-primary`}
      >
        {distinctRowData().map((row) => {

            return (
              <Dropdown.Item
                onClick={() => props.selectAppName(row)}
                eventKey={row}
              >
                {row}
              </Dropdown.Item>
            );
          })}
      </DropdownButton>

    )
}

export default DropdownComponent;