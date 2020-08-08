import React from "react";
import {
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import { filterKeyToName } from "../../utils";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = props => (
  <InputGroup className="w-75">
    <InputGroup.Prepend>
      <InputGroup.Text>
        <FontAwesomeIcon
          icon={faQuestion}
          onClick={() => {
            props.openHelpComponent();
          }}
        />
      </InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Search"
      value={props.queryText}
      onKeyUp={e => props.updateQueryText(e.target.value, e.key)}
    />
    <InputGroup.Append>
      <DropdownButton
        title={
          filterKeyToName[props.selectedFilter]
            ? filterKeyToName[props.selectedFilter]
            : props.selectedFilter
        }
        variant={"primary"}
        id={`dropdown-variants-primary`}
      >
        {props.filters &&
          props.filters.map(filter => {
            return (
              <Dropdown.Item
                onClick={() => props.onFilterChange(filter)}
                eventKey={filter}
              >
                {filterKeyToName[filter]}
              </Dropdown.Item>
            );
          })}
      </DropdownButton>
    </InputGroup.Append>
  </InputGroup>
);

export default SearchBar;
