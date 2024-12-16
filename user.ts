import { PrismaClient } from "@prisma/client";
import Express, { Request, Response } from "express";
const Prisma = new PrismaClient();

export const GetTasks = async (req: Request, res: Response) => {
    try {
        const users = await Prisma.tasks.findMany(); // Adjust based on your schema
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        if(!body){
            res.status(403).json({message: "Invalid name of the task"})
        }
        const User = await Prisma.tasks.create({
            data: body
        })
        res.status(201).json(User);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error})
    }
}

export const GetById = async (req: Request, res: Response)=>  {
    try {
        const { id } = req.params;
        if(!id) {
            res.status(403).json({ message: "Invalid task ID"})
            return;
        }
        const User = await Prisma.tasks.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if(!User) {
            res.status(404).json({ message: "Task not found"})
            return;
        }
        res.json({IsSuccess: true, User});
    } catch (error) {
        res.status(404).json({ message: "Task not found", error: error})
    }
}

export const UpdateTask = async (req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const body = req.body;
        if(!id) {
            res.status(403).json({ message: "Invalid task ID"})
            return;
        }
        if (!body) {
            res.status(403).json({ message: "Invalid body to update"}) 
        }
        const User = await Prisma.tasks.update({
            where: {
                id: parseInt(id)
            },
            data: body
        })
        if(!User) {
            res.status(404).json({ message: "Task not found"})
            return;
        }
        res.json({IsSuccess: true, User});
    } catch (error) {
        res.status(404).json({ message: "Task not found" });
    }
}


export const DeleteTask = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        if(!id){
            res.status(403).json({ message: "Invalid task ID"})
            return;
        }
        const User = await Prisma.tasks.delete({
            where: {
                id: parseInt(id)
            }
        })
        if(!User) {
            res.status(404).json({ message: "Task not found"})
            return;
        }
        res.status(200).json({isSuccess: true, message: "Task successfully Deleted", User})
    }catch(err) {
        res.status(500).json({ error: "Something went wrong",  err});
    }
}