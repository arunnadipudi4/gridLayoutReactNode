import React from "react";
import {
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";
import { filterKeyToName } from "../../utils";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
