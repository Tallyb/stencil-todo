import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { ItemsService } from '../../services/items';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css'
})
export class TodoList {

    @Event() todoItemsChanged: EventEmitter<any>;
    
    @Prop({mutable: true}) items = []; 

    private itemsService = new ItemsService(); 

    async componentWillLoad (){
        if(!this.items) {
            this.items =  await this.itemsService.get()
        }
    }

    changeItem(index, value) {
        this.items = [...this.items.slice(0, index),
        {
            name: value, 
            done: false
        },
        ... this.items.slice(index + 1)];
        this.todoItemsChanged.emit(this.items);
    }

    removeItem(index) {
        this.items = [
            ...this.items.slice(0, index),
            ...this.items.slice(index + 1)
        ];
        this.todoItemsChanged.emit(this.items);
    }

    toggleItem(index) {
        this.items = [
            ...this.items.slice(0, index),
            {
                name: this.items[index].name, 
                done: !this.items[index].done
            },
            ...this.items.slice(index + 1)
        ];
        this.todoItemsChanged.emit(this.items);
    }

    getRemainingItems() {
        return this.items.filter( i => !i.done).length;
    }

    addItem(ev) {
        if (ev.key == 'Enter' && ev.target.value) {
            this.items = [{name: ev.target.value, done: false}, ...this.items ];
            ev.target.value = '';
        }        
    }

    renderMain(): JSX.Element {
        return (
            <section class="main">
                <ul class="todo-list">
                    {this.items.map((i, k) =>
                        <todo-item name={i.name} done={i.done}
                            onItemChanged={ ev => this.changeItem(k, ev.detail)}
                            onItemRemoved={() => this.removeItem(k)}
                            onItemToggled={() => this.toggleItem(k)}
                        ></todo-item>
                    )}
                </ul>
            </section>
        )
    }

    render() {
        return (
          <div>
            <input class="new-todo" 
                placeholder="What needs to be done?" 
                autofocus=""
                onKeyPress={ev => this.addItem(ev)}
            />
            {this.items.length === 0 ? '': this.renderMain()}
            <footer class="footer">
                <span class="todo-count"><strong> {this.getRemainingItems()} Left</strong> </span>
            </footer>
          </div>
    );
    }
}

