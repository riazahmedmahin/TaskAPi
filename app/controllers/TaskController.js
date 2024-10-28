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

        let id = req.params.id;
        let status = req.params.status;
        let user_id = req.headers['user_id']
        await TasksModel.updateOne({"_id":id,"user_id":user_id},{
            status:status
        })
        return res.json({ status: "success", message: "Task Update stccessfull" });
    }
    catch(e){
        return res.json({ status: "fail", message: e.toString() });
    }
};

export const TaskListbyStatus = async (req, res) => {
    try{
        let user_id=req.headers['user_id']
        let status = req.params.status
        let data = await TasksModel.find({user_id:user_id,status:status})
        return res.json({ status: "success", message: "Task list",data:data });
        
    }
    catch(e){
        return res.json({ status: "fail", message: e.toString() });

    }
    
};

export const DeleteTask = async (req, res) => {
    try{
        let id=req.params.id;
        let user_id = req.headers['user_id']
        await TasksModel.deleteOne({"_id":id,"user_id":user_id})
        return res.json({ status: "success", message: "Task deleted" });

    }
    catch(e){
        return res.json({ status: "faid", message: e.toString() });

    }
    
};

export const CountTask = async (req, res) => {
    return res.json({ status: "success", message: "Task count retrieved" });
};
