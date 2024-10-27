// app/controllers/TaskController.js
import TasksModel from "../model/TaskModel.js"

export const CreateTask = async (req, res) => {
    try{
        let user_id = req.headers['user_id'];
        let reqbody=req.body;
        reqbody.user_id=user_id;
        
        await TasksModel.create(reqbody)
        return res.json({ status: "success", message: "Task created" });
    }
    catch(e){
        return res.json({ status: "fail", message: e.toString() });
    }
    
};

export const UpdateTaskStatus = async (req, res) => {
    try{

    }
    catch(e){
        return res.json({ status: "success", message: e.toString() });

    }
};

export const TaskListbyStatus = async (req, res) => {
    return res.json({ status: "success", message: "Task list retrieved" });
};

export const DeleteTask = async (req, res) => {
    return res.json({ status: "success", message: "Task deleted" });
};

export const CountTask = async (req, res) => {
    return res.json({ status: "success", message: "Task count retrieved" });
};
