// app/controllers/TaskController.js
export const CreateTask = async (req, res) => {
    return res.json({ status: "success", message: "Task created" });
};

export const UpdateTaskStatus = async (req, res) => {
    return res.json({ status: "success", message: "Task status updated" });
};

export const TaskListbyStatus = async (req, res) => {
    return res.json({ status: "success", message: "Task list retrieved" });
};

export const Delete = async (req, res) => {
    return res.json({ status: "success", message: "Task deleted" });
};

export const Count = async (req, res) => {
    return res.json({ status: "success", message: "Task count retrieved" });
};
