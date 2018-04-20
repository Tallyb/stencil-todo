import { Component, State } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css'
})
export class TodoList {

    @State() items = [
        {name: 'Milk the cow', done: true},
        {name: 'Buy milk', done: false}
    ]; 

    changeItem(index, value) {
        this.items[index] = {
            name: value, 
            done: false
        };
    }

    removeItem(index) {
        this.items = [
            ...this.items.slice(0, index),
            ...this.items.slice(index + 1)
        ];
    }

    toggleItem(index) {
        this.items[index] = {
            name: this.items[index].name, 
            done: !this.items[index].done
        };
        console.log('TOGGLE', this.items);
    }

    getRemainingItems() {
        return this.items.filter( i => i.done).length;
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
                            onItemChanged={(v) => this.changeItem(k, v)}
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

