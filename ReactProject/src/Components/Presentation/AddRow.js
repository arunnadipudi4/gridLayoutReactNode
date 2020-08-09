import React from 'react';
import { Modal, Button,InputGroup, FormControl } from 'react-bootstrap';

const AddRow = (props) => {
    const { show, handleClose, handleSaveChanges } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="App Name"
                        aria-label="App Name"
                        aria-describedby="basic-addon1"
                        onKeyUp={e => props.updateInputText(e.target.value, 'APPNAME')}
                    />
                     <FormControl
                         placeholder="SQL query"
                         aria-label="SQL query"
                         aria-describedby="basic-addon1"
                         onKeyUp={e => props.updateInputText(e.target.value, 'SQLQUERY')}
                    />
                     <FormControl
                         placeholder="Created By"
                         aria-label="Created By"
                         aria-describedby="basic-addon1"
                         onKeyUp={e => props.updateInputText(e.target.value, 'CREATEDBY')}
                    />
                     <FormControl
                         placeholder="Updated By"
                         aria-label="Updated By"
                         aria-describedby="basic-addon1"
                         onKeyUp={e => props.updateInputText(e.target.value, 'UPDATEDBY')}
                    />
                </InputGroup>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
          </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddRow;