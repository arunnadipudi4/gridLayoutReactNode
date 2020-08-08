import React from "react";
import { Modal, Button } from "react-bootstrap";

function HelpComponent(props) {
  const { showHelpComponent, openHelpComponent, heading, renderProps } = props;
  return (
    <Modal show={showHelpComponent} onHide={() => openHelpComponent()}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderProps}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => openHelpComponent()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HelpComponent;
