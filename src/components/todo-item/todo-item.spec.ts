import { TestWindow } from '@stencil/core/testing';
import { TodoItem } from './todo-item';

describe('todo-list', () => {
    let win;
    beforeEach(() => {
        win = new TestWindow();
    });

    describe('events emitting', () => {
        let element;
        beforeEach( async () => {
            element = await win.load({
                components: [TodoItem],
                html: '<todo-item name="this item" done="false"></todo-item>'
            });
        });

        it('should emit item toggled', async () => {
            let eventSpy = jest.fn(); 
            win.document.addEventListener('itemToggled', eventSpy);
            element.querySelector('.toggle').click();
            expect(eventSpy).toHaveBeenCalled();
        });

        it('should emit item changing', () => {            
            // create a spy on the event and attach to listener
            let eventSpy = jest.fn(); 
            win.document.addEventListener('itemChanged', eventSpy);
            // perform the action and flush the window
            element.querySelector('label').click();
            win.flush();
            // create an input event
            let change = win.document.createEvent('Event');
            change.initEvent('change', true, false);
            // Set value on the input element & dispatch the event
            let value = 'New Value';
            let input = element.querySelector('.edit');
            input.value = value;
            input.dispatchEvent(change);
            // expectations
            expect(eventSpy).toHaveBeenCalled();
            expect(eventSpy.mock.calls[0][0].detail).toEqual(value);
        });

        
    });

});