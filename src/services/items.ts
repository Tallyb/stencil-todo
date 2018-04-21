export class ItemsService {

    get () {
        console.log('CALLED GET')
        return Promise.resolve([
            {name: 'Milk the cow', done: true},
            {name: 'Buy milk', done: false}
        ]);
    }
}