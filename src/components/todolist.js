import React, { useState,useEffect } from "react";
import Todo from "./todo";
import axios from "axios";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:9090/";
//const accessToken = JSON.parse(localStorage.getItem('user')).token;

//const authAxios = axios.create({
//    baseURL: API_URL,
//    headers: {
//        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
//    },
//});

const AllTodos=()=>{

    useEffect(()=>{
        document.title = "All Todos";
        getAllTodosFromServer();
    },[]);

    const [todos,setTodos] = useState([]);

    const updateTodos=(id)=>{
        setTodos(todos.filter((t)=>t.id !==id));
    }

    const getAllTodosFromServer=()=>{
        axios.get(API_URL+`todo/all/${JSON.parse(localStorage.getItem('user')).User.id}`,{ headers: authHeader() }).then(
        (response)=>{
            console.log(response.data);
            setTodos(response.data);
        },
        (error)=>{
            console.log(error);
        }
        )
    }


    return(
        <div>
            <h1>All Todos</h1>
            <p>List of Todos are as follows</p>
            {todos.length > 0 ? 
                todos.map((item)=><Todo key = {item.id} todo = {item} update = {updateTodos}/>) 
                : "No Todos Available"
            }
        </div>
    );
};

export default AllTodos;