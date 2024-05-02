import express, { response } from 'express';
import cors from 'cors'
import mysql from 'mysql2';
import rootRouter from './routes/rootRouter.js';
const app = express();
app.listen(8080);
app.use(express.json());
app.use(cors());
app.use(rootRouter);
app.use(express.static("."));
app.get("/test",(req,res)=>{
const {id} = req.query;
res.send(id);
})

