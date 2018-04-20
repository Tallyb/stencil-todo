import { Component, Prop, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item.css'
})

export class TodoItem {
  
  @Prop() name: string; 
  @Prop() done: boolean;
  @Prop() index: number;

  @State() editMode = false;

  @Event() itemChanged: EventEmitter<any>;
  @Event() itemRemoved: EventEmitter<number>;
  @Event() itemToggled: EventEmitter<number>;

  emitItem() {
      this.itemChanged.emit({
        index: this.index,
        name: this.name,
        done: this.done
      });
  }
  onInputChanged(ev) {
    console.log('Value', ev.value)
    this.itemChanged.emit({index: this.index, name: ev.value});
  }

  toggleCompletion() {
    this.itemToggled.emit(this.index);    
  }

  remove() {
    this.itemRemoved.emit(this.index);
  }
  edit () {

  }
  render() {
    return (
      <li>
        <div class="view">
            <input class="toggle" type="checkbox" onClick={() => this.toggleCompletion()} checked={this.done}/>
            <label onClick={() => this.edit()}>{this.name}</label>
            <button class="destroy" onClick={() =>this.remove()}></button>
		</div>
        <input class="edit" type="text"
            placeholder="New Todo"
            value={this.name}
            onInput={() => this.onInputChanged}
        />
      </li>
    );
  }
}