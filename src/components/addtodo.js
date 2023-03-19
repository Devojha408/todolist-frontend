import axios from "axios";
import moment from "moment";
import authHeader from "../services/auth-header";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
const API_URL = "http://localhost:9090/";
//const accessToken = JSON.parse(localStorage.getItem('user')).token;

//const authAxios = axios.create({
//    baseURL: API_URL,
//    headers: {
//        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
//    },
//});

const AddTodo = () => {

    const [todos, setTodos] = useState({});
    useEffect(() => {
        document.title = "Create Todos"

        setTodos({
            "user": JSON.parse(localStorage.getItem('user')).User.id,
            "status": false
        })

    }, []);

    const navigate = useNavigate();

    const handleForm = (e) => {
        console.log(todos);
        postDataToServer(todos);
        e.preventDefault();
        navigate("/todos");
        window.location.reload();
    };

    //creating function to post data in server
    const postDataToServer = (data) => {
        axios.post(API_URL + `todo`, data, { headers: authHeader() }).then(
            (response) => {
                console.log(response);
                console.log("success");
            },
            (error) => {
                console.log(error);
                console.log("error");
            }
        )
    };

    return (
        <Fragment>
            <div>
                <h1 className="text-center">Create ToDo</h1>
                <Form onSubmit={handleForm}>
                    <FormGroup row>
                        <Label sm={3} for="taskname"> Task Name</Label>
                        <Col sm={9}><Input type="text" placeholder="Enter Task here" name="taskname" id="taskname" onChange={(e) => { setTodos({ ...todos, taskname: e.target.value }) }} /></Col>
                    </FormGroup >
                    <FormGroup row>
                        <Label sm={3} for="task"> Task Discription</Label>
                        <Col sm={9}><Input type="textarea" placeholder="Enter Your Text here" name="task" id="task" onChange={(e) => { setTodos({ ...todos, task: e.target.value }) }} /></Col>
                    </FormGroup>
                    <FormGroup>
                        <Label sm={3} for="targetdate"> Target Date</Label>
                        <Col sm={9}><Input type="datetime-local" name="targetdate" id="targetdate" min={moment().format("YYYY-MM-DDThh:mm")} onChange={(e) => { setTodos({ ...todos, targetdate: moment(e.target.value).format() }) }} /></Col>
                    </FormGroup>

                    <Container className="text-center">
                        <Row xs="2">
                            <Col  ><Button color="success" type="submit">Add ToDo</Button></Col>
                            <Col  ><Button color="warning" type="reset">Clear</Button></Col>
                        </Row>
                    </Container>
                </Form>
            </div>
        </Fragment>
    );
}

export default AddTodo;