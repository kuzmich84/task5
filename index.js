import express from "express";
import appSrc from "./app.js";
import crypto from "crypto";
import {createReadStream} from "fs";
import http from "http";
import bodyParser from "body-parser";
import m from "mongoose";
import dot from "dotenv";
import UserModel from "./models/Users.js";
import UserController from "./routes/UserController.js";


dot.config({path: './.env'});
const {URL} = process.env;

const User = UserModel(m);

const PORT = process.env.PORT || 3000;

const app = appSrc(express, bodyParser, createReadStream, crypto, http, User, UserController);

try {
    await m.connect(URL)
    app.listen(PORT, () => {
        console.log(`${PORT}`)
    });


} catch (e) {
    console.log(e.codeName)
}


