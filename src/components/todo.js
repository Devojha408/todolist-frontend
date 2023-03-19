import React from "react";
import authHeader from "../services/auth-header";
import moment from "moment";
import {
    Card, CardBody, CardTitle,
    CardText, CardFooter, Button, Container, Row, Col, CardSubtitle
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:9090/";


const Todo = ({ todo, update }) => {

    const deleteTodo = (id) => {
        axios.delete(API_URL+`todo/${id}`, { headers: authHeader() }).then(
            (response) => {
                console.log("Todo Deleted"+response);
                update(id);
            },
            (error) => {
                console.log("Todo Not Deleted"+error);
            }
        )
    };
  
	const doneTask = (id) => {
	    axios.put(API_URL+`todo/done/${id}`, { headers: authHeader() }).then(
	        (response) => {
	            console.log("Task Done"+response);
	           update(id);
	        },
	        (error) => {
	            console.log("Task Not Done"+error);
	        }
	    )
	};
	 
	const undoTask = (id) => {
	    axios.put(API_URL+`todo/undo/${id}`, { headers: authHeader() }).then(
	        (response) => {
	            console.log("Task Undo"+response);
	           update(id);
	        },
	        (error) => {
	            console.log("Task Not Undo"+error);
	        }
	    )
	};

    return (
        <Card>
            <CardBody className="text-center">
                <CardTitle className="font-weight-bold"><h3>{todo.taskname}</h3></CardTitle>
                <CardSubtitle className="card-subtitle mb-2 text-danger">{(moment(todo.targetdate).format('YYYY-MM-DDTHH:mm') < moment().format('YYYY-MM-DDTHH:mm')) && !todo.status ? 'Task Expired on ' + moment(todo.targetdate).format('YYYY-MM-DDTHH:mm') : 'Target Date and Time: '+ moment(todo.targetdate).format('YYYY-MM-DDTHH:mm') }</CardSubtitle>
                <CardSubtitle className="card-subtitle mb-2 text-muted">Status Task: {todo.status ? 'Completed' : 'Not Completed' }</CardSubtitle>
                <CardText>Discription: {todo.task}</CardText>
                <CardFooter>
                    <Container className="text-center">
                        <Row xs="2">
                            <Col><Button color="warning"><Link to="/todoupdate" onClick={() =>{localStorage.setItem('todo', JSON.stringify(todo));}} >Edit</Link></Button></Col>
                            <Col><Button color="success" onClick={() => { doneTask(todo.id); }}  >Done</Button></Col>
                            <Col><Button color="info" onClick={() => { undoTask(todo.id); }}  >Undo</Button></Col>
                            <Col><Button color="danger" onClick={() => { deleteTodo(todo.id); }} >Delete</Button></Col>
                        </Row>
                    </Container>
                </CardFooter>
            </CardBody>
        </Card>
    );

}

export default Todo;