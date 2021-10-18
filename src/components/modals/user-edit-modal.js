import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from 'react-router-dom';
import { update } from "../../actions/user";
import { connect } from "react-redux";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
class EditModal extends Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeBirthDate = this.onChangeBirthDate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);

        this.state = {
            id: this.props.object.id,
            email: this.props.object.email,
            first_name: this.props.object.first_name,
            last_name: this.props.object.last_name,
            birth_date: this.props.object.birth_date,
            avatar: "",
            loading: false,
            show: false,
            file: "",
        };
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value,
        });
    }

    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value,
        });
    }

    onChangeBirthDate(e) {
        this.setState({
            birth_date: e.target.value,
        });
    }

    handleClose(e) {
        this.setState({
            show: false,
        });
    }
    handleShow(e) {
        this.setState({
            show: true,
        });
    }
    onChangeAvatar(e) {
        console.log(e.target.files[0]);
        this.setState({
            file: e.target.files[0],
        });
    }

    handleUpdate(e) {
        e.preventDefault();

        this.setState({
            loading: true,
        });

        this.form.validateAll();

        const { dispatch, history } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            dispatch(update(this.state.id, this.state.password, this.state.first_name, this.state.last_name, this.state.birth_date, this.state.file))
                .then(() => {
                    history.push("/user");
                    window.location.reload();
                })
                .catch(() => {
                    this.setState({
                        loading: false
                    });
                });
        } else {
            this.setState({
                loading: false,
            });
        }
    }
    render() {
        const { isLoggedIn, message } = this.props;

        if (isLoggedIn) {
            return <Redirect to="/profile" />;
        }

        return (
            <>
                <Button variant="success" onClick={this.handleShow}><i class="far fa-edit"></i></Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form
                        onSubmit={this.handleUpdate}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="col-md-12">
                                <div className="card card-container">
                                    <img
                                        src={this.props.object.avatar}
                                        alt="profile-img"
                                        className="profile-img-card"
                                    />

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="first_name">first_name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="first_name"
                                            value={this.state.first_name}
                                            onChange={this.onChangeFirstName}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="last_name">last_name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="last_name"
                                            value={this.state.last_name}
                                            onChange={this.onChangeLastName}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="birth_date">birth_date</label>
                                        <Input
                                            type="date"
                                            className="form-control"
                                            name="birth_date"
                                            value={this.state.birth_date}
                                            onChange={this.onChangeBirthDate}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="avatar">avatar</label>
                                        <Input
                                            type="file"
                                            className="form-control"
                                            name="input"
                                            value={this.state.avatar}
                                            onChange={this.onChangeAvatar}
                                        />
                                    </div>

                                    <div className="form-group">

                                    </div>

                                    {message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={(c) => {
                                            this.checkBtn = c;
                                        }}
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Save Changes</span>
                            </button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default connect()(EditModal);