import { TestWindow } from '@stencil/core/testing';
import { TodoList } from './todo-list';
import { TodoItem } from '../todo-item/todo-item';

describe('todo-list', () => {
    let win;
    beforeEach(() => {
        win = new TestWindow();
    });

    const ITEMS = [
        { name: 'Item 1', done: false},
        { name: 'Item 2', done: false},
        { name: 'Item 3', done: true}
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

    describe('events payload', () => {
        it('should remove item from list on remove', () => {
    
            let comp = new TodoList();
            comp.items = ITEMS;
            const changedSpy = jest.fn();
            comp.todoItemsChanged = {
                emit: changedSpy
            };
            //const changedSpy = jest.spyOn(comp.todoItemsChanged, 'emit');
            comp.removeItem(1);
            expect(changedSpy).toHaveBeenCalledWith([
                { name: 'Item 1', done: false},
                { name: 'Item 3', done: true}
            ]);


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
        beforeEach( async () => {
            element = await win.load({
                components: [TodoList, TodoItem],
                html: '<todo-list></todo-list>'
            });
            element.items = ITEMS;
            win.flush();
        });
        it('should toggle second item', async () => {
            let eventSpy = jest.fn(); 
            win.document.addEventListener('todoItemsChanged', eventSpy);
            let toggles = element.querySelectorAll('.toggle');
            toggles[1].click();
            win.flush();
            expect(eventSpy).toHaveBeenCalled();
            expect(eventSpy.mock.calls[0][0].detail[2].done).toEqual(true);
        });

        fit('should update second item', async () => {
            let eventSpy = jest.fn(); 
            win.document.addEventListener('todoItemsChanged', eventSpy);
            let todo = element.querySelectorAll('todo-item')[1];
            todo.querySelector('label').click();
            win.flush();
            // create an input event
            let change = win.document.createEvent('Event');
            change.initEvent('change', true, false);
            // Set value on the input element & dispatch the event
            let value = 'New Value';
            let input = element.querySelector('.edit');
            input.value = value;
            input.dispatchEvent(change);
            win.flush();
            // expectations
            expect(eventSpy).toHaveBeenCalled();
            expect(eventSpy.mock.calls[0][0].detail[1].name).toEqual(value);
        });
        
    });
});