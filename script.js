function todoApp() {
    const initialStore = {
        todo: [],
        done: []
    }

    // action type
    const ADD_TODO = "ADD_TODO"
    const DONE_TODO = "DONE_TODO"
    const TODO_DONE = "TODO_DONE"

    // action creator
    function addTodo(todo) {
        return {
            type: ADD_TODO,
            value: todo
        }
    }

    function doneTodo(index) {
        return {
            type: DONE_TODO,
            index: index
        }
    }

    function todoDone(index) {
        return {
            type: TODO_DONE,
            index: index
        }
    }

    // reducer
    function reducer(state, action) {
        switch (action.type) {
            case ADD_TODO:
                return {
                    ...state,
                    todo: [
                        ...state.todo,
                        action.value
                    ]
                }
            case DONE_TODO:
                let todo = [].concat(state.todo)
                todo.splice(action.index,1)
                let doneItem = state.todo[action.index];
                return {
                    ...state,
                    todo: todo,
                    done: [
                        ...state.done,
                        doneItem
                    ]
                }
            case TODO_DONE:
                let done = [].concat(state.done);
                done.splice(action.index,1);
                let todoItem = state.done[action.index]
                return {
                    todo: [
                        ...state.todo,
                        todoItem
                    ],
                    done: done
                }
            default:
                return state
        }
    }

    const store = Redux.createStore(reducer, initialStore)

    let form = document.getElementById("form");
    form.onsubmit = function (e) {
        let todoItem = document.getElementsByName("item")[0].value;
        store.dispatch(addTodo(todoItem))

        // reset and prevent default
        e.preventDefault();
        form.reset()
    }

    store.subscribe(render)

    function render() {
        state = store.getState()
        let todoUl = document.getElementById("todo");
        todoUl.innerHTML = "";
        for (let i in state.todo) {
            let li = document.createElement("li");
            li.innerHTML = state.todo[i];
            li.setAttribute('data-index', i)
            li.onclick = todoOnClick
            todoUl.appendChild(li);
        }

        let doneUl = document.getElementById("done");
        doneUl.innerHTML = "";
        for (let i in state.done) {
            let li = document.createElement("li");
            li.innerHTML = state.done[i] 
            li.setAttribute('data-index', i)
            li.onclick = doneOnClick
            doneUl.appendChild(li);
        }
    }

    function todoOnClick(e) {
        let element = e.target;
        let index = element.dataset.index;
        store.dispatch(doneTodo(index));
    }
    
    function doneOnClick(e) {
        let element = e.target;
        let index = element.dataset.index
        store.dispatch(todoDone(index));
    }

}

document.addEventListener("DOMContentLoaded", todoApp);