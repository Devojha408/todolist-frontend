import axios from "axios";
import moment from "moment";
import authHeader from "../services/auth-header";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label,Col,Row } from "reactstrap";
const API_URL = "http://localhost:9090/";
//const accessToken = JSON.parse(localStorage.getItem('user')).token;

//const authAxios = axios.create({
//    baseURL: API_URL,
//    headers: {
//        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
//    },
//});

const UpdateTodo = () => {

    const [todos, setTodos] = useState({});
    //const ut = JSON.parse( localStorage.getItem('todo')).text;
    useEffect(() => {
        document.title = "Update Todos"

        setTodos({
       "user": JSON.parse(localStorage.getItem('user')).User.id,
       "id": JSON.parse( localStorage.getItem('todo')).id,
       "status": JSON.parse( localStorage.getItem('todo')).status,
       "taskname": JSON.parse( localStorage.getItem('todo')).taskname,
       "task": JSON.parse( localStorage.getItem('todo')).task,
       "targetdate": JSON.parse(localStorage.getItem('todo')).targetdate,
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
    var str2bool = (value) => {
        if (value && typeof value === "string") {
             if (value.toLowerCase() === "true") return true;
             if (value.toLowerCase() === "false") return false;
        }
        return value;
     }

    //creating function to post data in server
    const postDataToServer = (data) => {
        axios.put(API_URL+`todo/update/${todos.id}`, data,{ headers: authHeader() }).then(
            (response) => {
                console.log(response);
                console.log("success");
                localStorage.removeItem('todo');
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
            <h1 className="text-center">Update Todos</h1>
            <Form onSubmit={handleForm}>
                <FormGroup row>
                    <Label sm={3} for="taskname"> Task Name</Label>
                    <Col sm={9}><Input type="text" value={todos.taskname} placeholder="Enter Task here" name="taskname" id="taskname" onChange={(e) => { setTodos({ ...todos, taskname: e.target.value }) }} /></Col>
                </FormGroup >
                <FormGroup row>
                    <Label sm={3} for="task"> Task Discription</Label>
                    <Col sm={9}><Input type="textarea" value={todos.task} placeholder="Enter Your Text here" name="task" id="task" onChange={(e) => { setTodos({ ...todos, task: e.target.value }) }} /></Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3} for="status"> Task Status Completed: {String(todos.status)} </Label>
                    Done: <Input sm={9} type="radio" value="true" name="status" id="status" onChange={(e) => { setTodos({ ...todos, status: str2bool(e.target.value) }) }} />
                    Undo: <Input sm={9} type="radio" value="false" name="status" id="status" onChange={(e) => { setTodos({ ...todos, status: str2bool(e.target.value) }) }} />
                </FormGroup>
                <FormGroup>
                    <Label sm={3} for="targetdate"> Target Date : {moment(JSON.parse( localStorage.getItem('todo')).targetdate).format('YYYY-MM-DDTHH:mm')}</Label>
                    <Col sm={9}><Input type="datetime-local"  name="targetdate" id="targetdate" min={moment().format("YYYY-MM-DDThh:mm")} onChange={(e) => { setTodos({ ...todos, targetdate: moment(e.target.value).format() }) }}/></Col>
                </FormGroup>
                
                <Container className="text-center">
                    <Row xs="2">
                        <Col  ><Button color="success" type="submit">Update Todo</Button></Col>
                        <Col  ><Button color="warning" type="reset">Clear</Button></Col>
                    </Row>
                </Container>
            </Form>
            </div>
        </Fragment>
    );
}

export default UpdateTodo;