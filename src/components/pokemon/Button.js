import React, { Component } from 'react';

const Button= ({history}) =>{
    return (
        <button className = 'btn btn-outline-danger' onClick = {history.goBack}></button>
    )
}

export default Button;
