import { Component } from '@stencil/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.css'
})
export class MyApp {

  render() {
    return (
      <section class="todoapp">
        <header>
            <h1>todos</h1>       
        </header>
        <todo-list></todo-list>
      </section>    
    );
  }
}
