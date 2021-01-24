import React from "react";

import AddItem from "../add-item/add-item";
import {Button} from "react-bootstrap";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function AddTaskModalWindow({addTask, selectedTask}) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="outline-primary"
                    disabled={!!selectedTask.size}
                    onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faPlus}/> Add task
            </Button>

            <AddItem
                show={modalShow}
                onHide={() => setModalShow(false)}
                addTask={addTask}
                selectedTask={selectedTask}
            />
        </>
    );
}

export default AddTaskModalWindow

AddTaskModalWindow.propTypes = {
    addTask: PropTypes.func.isRequired,
    selectedTask: PropTypes.object.isRequired
}