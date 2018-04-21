export class ItemsService {

    get () {
        return Promise.resolve([
            {name: 'Milk the cow', done: true},
            {name: 'Buy milk', done: false}
        ]);
    }
}