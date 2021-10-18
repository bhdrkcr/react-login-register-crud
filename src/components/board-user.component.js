import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import UserService from "../services/user-service";

import DetailModal from "./modals/user-detail-modal";
import EditModal from "./modals/user-edit-modal";

export default class BoardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }
    detail() {

    }
    render() {
        if (Array.isArray(this.state.content)) {
            return (
                <>
                    <div className="container">
                        <header className="jumbotron">
                            <div>
                                <div class="container">
                                    <div class="row">
                                        <div class="col-12">
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">index</th>
                                                        <th scope="col">First Name</th>
                                                        <th scope="col">Last Name</th>
                                                        <th scope="col">Birth Date</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                {this.state.content.map((item, index) => {
                                                    return (
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">{index}</th>
                                                                <td>{item.first_name}</td>
                                                                <td>{item.last_name}</td>
                                                                <td>{item.birth_date}</td>
                                                                <td>
                                                                    <DetailModal object={item} />
                                                                    <EditModal object={item} />
                                                                    <Button onClick={this.delete} type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></Button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    );
                                                })}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                </>
            );
        }
        else {
            return (
                <div className="container">
                    <header className="jumbotron">
                        {this.state.content}
                    </header>
                </div>
            );
        }

    }
}