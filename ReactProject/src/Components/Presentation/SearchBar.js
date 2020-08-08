import React from "react";
import {
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";

const SearchBar = props => (
  <InputGroup className="w-75">
    <FormControl
      placeholder="Search By App name"
      value={props.queryText}
      onKeyUp={e => props.updateQueryText(e.target.value, e.key)}
    />
    <InputGroup.Append>
      <Button
        title={'Search'}
        variant={"primary"}
        onClick={() => props.filterByAppName()}
      > {'Search'}
      </Button>
    </InputGroup.Append>
  </InputGroup>
);

export default SearchBar;
