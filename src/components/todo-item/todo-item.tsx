import { Component, Prop, Event, EventEmitter, State } from '@stencil/core';

export interface ITodoItem{
    name: string;
    done?: boolean;
}
@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item.css'
})

export class TodoItem {
  
  @Prop() name: string; 
  @Prop() done: boolean;

  @State() editMode = false;

  @Event() itemChanged: EventEmitter<any>;
  @Event() itemRemoved: EventEmitter<number>;
  @Event() itemToggled: EventEmitter<number>;

  toggleCompletion() {
    this.itemToggled.emit();    
  }

  remove() {
    this.itemRemoved.emit();
  }
  onEdit () {
    this.editMode = true
  }

  onBlur() {
    this.editMode = false;
  } 
  onEditDone(ev) {
    if (ev.target.value ) {
        this.itemChanged.emit(ev.target.value);
    }        
    this.editMode = false;
}

  render() {
    return (
      <li>
        {this.editMode ? 
            <input class="edit" type="text"
            placeholder="New Todo"
            value={this.name}
            onChange={ev => this.onEditDone(ev)}
            onBlur={() => this.onBlur()}
        />
        :
        <div class="view" >
            <input class="toggle" type="checkbox" onClick={() => this.toggleCompletion()} checked={this.done}/>
            <label onClick={() => this.onEdit()}>{this.name}</label>
            <button class="destroy" onClick={() =>this.remove()}></button>
        </div>
}        
      </li>
    );
  }
}