import React, { Component } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
// import { DatePicker } from 'react-bootstrap-date-picker';

class AgeInputform extends Component {

    constructor (props) {
        super(props);

        this.state = {
            validated: false
        };
    }

    validate (e) {
        this.setState({ validated: true });
        return e.currentTarget.checkValidity();
    }

    submitForm (e) {
        e.preventDefault();
        e.stopPropagation();

        if (!this.validate(e)) {
            return;
        }

        const formData = new FormData(e.currentTarget);

        let record = {
            name: formData.get("name"),
            DOB: formData.get("DOB")
        };

        if (this.props.record.id) record.id = this.props.record.id;

        this.props.onSave(record)
    }

	render () {
        const {validated} = this.state;

		return (
            <Modal show={true} onHide={() => this.props.onCancel()}>
                <Form 
                    noValidate
                    validated={validated}
                    onSubmit={(e) => {this.submitForm(e)}}
                >
                    <Modal.Body>
                        <Row>
                            <Col sm="12" lg="2">
                                <Form.Label>Name</Form.Label>
                            </Col>
                            <Col sm="12" lg="10">
                                <Form.Control 
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    defaultValue={this.props.record.name}
                                    required/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" lg="2">
                                <Form.Label>DOB</Form.Label>
                            </Col>
                            <Col sm="12" lg="10">
                                <Form.Control
                                    type="text"
                                    name="DOB"
                                    placeholder="DD/MM/YYYY"
                                    defaultValue={this.props.record.DOB}
                                    pattern="\d{2}\/\d{2}\/\d{4}"
                                    required/>
                            </Col>
                        </Row>                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.onCancel()}>Cancel</Button>
                        <Button variant="danger" type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
		);
	}
}

export default AgeInputform;
