import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this.tasks;
    }
    public getTaskById(id: string): Task[] {
        return this.tasks.filter((task) => task.id === id);
    }
    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        //define a temporary array to hold the result
        let tasks = this.getAllTasks();
        //do something with status
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        //do something with search
        if (search) {
            tasks = tasks.filter(task => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                return false;
            });
        }
        //return final result
        return tasks;
    }
    public createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }
    public updateTask(id: string, status: TaskStatus): Task[] {
        const task = this.getTaskById(id);
        task[0].status = status;
        return task;
    }
    public deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id)
    }
}
