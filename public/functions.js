"use strict";

// global
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const userForm = $("#username");
const msgForm = $("#message");
const msgField = $("#msg");
const submit = $("#send");
const chat = $("#chat");

//socket
const socket = io.connect();

// functions
const init = () => {
    msgForm.addEventListener("submit", msgValue);
};

const msgValue = e => {
    e.preventDefault();
    const liCreate = document.createElement("li");

    if (msgField.value === "") {
        return;
    } else {
        $("#chat ul").appendChild(liCreate).innerHTML = msgField.value;
        msgField.value = null;
    }
    
};
init();

// socket fronted
socket.on("user join", msg => {
    const liCreate = document.createElement("li");
    const userJoinMsg = `<span class="success">${msg}</span>`;
    $("#chat ul").appendChild(liCreate).innerHTML = userJoinMsg;
});

socket.on("user leave", msg => {
    const liCreate = document.createElement("li");
    const userJoinMsg = `<span class="error">${msg}</span>`;
    $("#chat ul").appendChild(liCreate).innerHTML = userJoinMsg;
});

const username = "Matze";

socket.emit("send username", username);