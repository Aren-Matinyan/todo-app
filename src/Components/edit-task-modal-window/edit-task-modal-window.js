import React from "react";

import EditTask from "../edit-task/edit-task";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function EditTaskModalWindow({editTask, selectedTask, editedTask}) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="outline-warning float-right"
                    disabled={!!selectedTask.size}
                    className="mr-2"
                    onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faEdit}/>
            </Button>

            <EditTask
                show={modalShow}
                onHide={() => setModalShow(false)}
                editTask={editTask}
                selectedTask={selectedTask}
                editedTask={editedTask}
            />
        </>
    );
}

export default EditTaskModalWindow

EditTaskModalWindow.propTypes = {
    editTask: PropTypes.object.isRequired,
    editedTask: PropTypes.func.isRequired,
    selectedTask: PropTypes.object.isRequired
}