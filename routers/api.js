// app/routers/api.js
import express from "express";
import * as TaskController from "../app/controllers/TaskController.js";
import * as UserControllers from "../app/controllers/UserControllers.js";
import auth from "../app/middlewire/auth.js";

const router = express.Router();

// USER routes
router.post("/Registration", UserControllers.Registration);
router.post("/Login", UserControllers.Login);
router.get("/ProfileDetails",auth ,UserControllers.ProfileDetails);
router.post("/ProfileUpdate",auth ,UserControllers.ProfileUpdate);
router.get("/EmailVerity/:email", UserControllers.EmailVerity);
router.post("/CodeVerity", UserControllers.CodeVerity);
router.post("/ResetePassword", UserControllers.ResetePassword);

// TASK routes
router.post("/CreateTask",auth,TaskController.CreateTask);
router.get("/UpdateTaskStatus/:user_id/:status", auth,TaskController.UpdateTaskStatus);
router.get("/TaskListbyStatus/:status",auth, TaskController.TaskListbyStatus);
router.get("/DeleteTask/:id",auth, TaskController.DeleteTask);
router.get("/CountTask",auth,TaskController.CountTask);


// Make sure to export the router
export default router; 
