import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import path from 'path';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
        // if we have any filters defined, call tasksService.getTasksWilFilters
        //otherwise, just get all tasks
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }
    @Get(':id')
    getTaskById(@Param('id') id: string): Task[] {
        return this.tasksService.getTaskById(id);
    }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }
    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task[] {
        return this.tasksService.updateTask(id, status);
    }
    @Delete(':id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id);
    }
}