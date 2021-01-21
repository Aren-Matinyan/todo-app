import React from "react"

import {Modal, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

function Confirm({onClose, onConfirm, count}) {

    return (
        <Modal
            show={true}
            onHide={onClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure you want to delete {count} task{count > 1 ? "s" : ""}?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button onClick={onConfirm}
                        variant="outline-danger">Ok</Button>
                <Button onClick={onClose}
                        variant="outline-success">Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

Confirm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
}

export default Confirm