import Button from '@mui/material/Button';
import axios from 'axios';
import React, { useState } from "react";

export default function Test (){
    const [text, setText] = useState("");
    function getText(){
        axios.get("http://localhost:5000/", { crossdomain: true }).then(
            () => {
                setText("Something wooo");
                console.log("function call");

            }
        )
    }
    return(
        <div>
            <Button onClick={getText}>
            Test
            </Button>
            <h1>{text}</h1>
        </div>
    )
};