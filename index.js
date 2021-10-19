import express from "express";
import appSrc from "./app.js";
import crypto from "crypto";
import {createReadStream} from "fs";
import http from "http";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;

const app = appSrc(express, bodyParser, createReadStream, crypto, http);

app.listen(PORT)