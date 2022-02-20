import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn()
});

const mockUser = {
    username: 'Fernando',
    id : 'someId',
    password: 'somePassword',
    tasks : [],
}

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository;
    beforeEach(async () => {
        //initialize a NestJS module with tasksService and tasksRepository
        const module = await Test.createTestingModule({
            providers: [TasksService,
                { provide: TasksRepository, useFactory: mockTasksRepository },
            ],
        }).compile();
        tasksService = module.get(TasksService);
        tasksRepository = module.get(TasksRepository); 
    });
    describe('getTasks', () => {
        it('calls  TasksRepository.getTasks and returns the result', async () => {
            expect(tasksRepository.getTasks).not.toHaveBeenCalled();
            tasksRepository.getTasks.mockResolvedValue('someValue');
            //call tasksService.getTasks, which should then call the respository's
            const result = await tasksService.getTask(null, mockUser);
            expect(tasksRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        });
    });

    describe('getTaskById', () => {
        it('calls TasksRespository.findOne and return the result',async () => {
            const mockTask = {
                title:'Test title',
                description: 'test desc',
                id:'someId',
                status: TaskStatus.OPEN,
            };
            await tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('someId',mockUser);
            expect(result).toEqual(mockTask);
        });
        it('calls TasksRespository.findOne and hadles the result',async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('someId',mockUser)).rejects.toThrow;
        });
    });
});