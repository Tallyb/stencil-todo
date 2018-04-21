import { TestWindow } from '@stencil/core/testing';
import { TodoList } from './todo-list';
import { TodoItem } from '../todo-item/todo-item';

describe('todo-list', () => {
    let win;
    beforeEach(() => {
        win = new TestWindow();
    });

    const ITEMS = [
        { name: 'an item', done: false},
        { name: 'an item', done: false},
        { name: 'an item', done: true}
    ];

    describe('remaining items', () => {
        it('should display remaining items', () => {
            let comp = new TodoList();
            comp.items = [
                { name: 'an item', done: true}
            ]
            expect(comp.getRemainingItems()).toEqual(0);
        });
    
        it('should display remaining items', () => {
            let comp = new TodoList();
            comp.items =ITEMS;
            expect(comp.getRemainingItems()).toEqual(2);
        });
        
    });

    describe('rendering', () => {
        it('should render with empty list', async () => {
            let element = await win.load({
                components: [TodoList],
                html: '<todo-list></todo-list>'
            }); 
            expect(element).toMatchSnapshot();
        });
        
        it('should render with items list', async () => {
            let element = await win.load({
                components: [TodoList],
                html: '<todo-list></todo-list>'
            });
            element.items = [
                {name: 'Milk the cow', done: true},
                {name: 'Buy milk', done: false}
            ];
            win.flush(); 
            expect(element).toMatchSnapshot();
        });        
    });

    describe('items editing', () => {
        let element;
        jest.mock('../../services/items', () => ({
                get: jest.fn(() => {
                    return Promise.resolve(ITEMS)
                })

        }));

        beforeEach( async () => {
            element = await win.load({
                components: [TodoList, TodoItem],
                html: '<todo-list></todo-list>'
            });
            win.flush();
        });
        fit('should edit an item', async () => {
            await console.log ('ITEMS', element)
        });
    });
});