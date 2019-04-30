import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './Confirm.css';

class Confirm extends Component {  

    constructor (props) {
        super(props);

        this.state = {
            destroyed: false
        }
    }

    cancelAction () {
        if (this.props.cancelAction) {
            this.props.cancelAction();
        }
    }

    confirmAction () {
        if (this.props.confirmAction) {
            this.props.confirmAction();
        }
    }

    render () {
        return (
            <Modal show={true} onHide={() => this.props.cancelAction()}>
                <Modal.Body>{this.props.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.cancelAction()}>
                        {this.props.cancelActionText || 'Cancel'}
                    </Button>
                    <Button variant="danger" onClick={() => this.confirmAction()}>
                        {this.props.confirmActionText || 'Yes'}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Confirm;
