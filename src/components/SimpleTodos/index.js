import {Component} from 'react'
import './index.css'
import TodoItem from '../TodoItem'

let uniqueId = 9

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening', isCompleted: false},
  {id: 2, title: 'Rent the movie for tomorrow movie night', isCompleted: false},
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
  },
  {id: 4, title: 'Drop the parcel at Bloomingdale', isCompleted: false},
  {id: 5, title: 'Order fruits on Big Basket', isCompleted: false},
  {id: 6, title: 'Fix the production issue', isCompleted: false},
  {id: 7, title: 'Confirm my slot for Saturday Night', isCompleted: false},
  {id: 8, title: 'Get essentials for Sunday car wash', isCompleted: false},
]

class SimpleTodos extends Component {
  state = {
    todoList: initialTodosList,
    inputText: '',
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onAddTodo = () => {
    const {inputText} = this.state
    if (inputText.trim() === '') return

    const parts = inputText.split(' ')
    const count = parseInt(parts[parts.length - 1])

    if (!isNaN(count)) {
      const title = parts.slice(0, -1).join(' ')
      const newTodos = []

      for (let i = 0; i < count; i++) {
        newTodos.push({
          id: uniqueId++,
          title,
          isCompleted: false,
        })
      }

      this.setState(prev => ({
        todoList: [...prev.todoList, ...newTodos],
        inputText: '',
      }))
    } else {
      const newTodo = {
        id: uniqueId++,
        title: inputText,
        isCompleted: false,
      }

      this.setState(prev => ({
        todoList: [...prev.todoList, newTodo],
        inputText: '',
      }))
    }
  }

  onDelete = id => {
    this.setState(prev => ({
      todoList: prev.todoList.filter(each => each.id !== id),
    }))
  }

  onToggleComplete = id => {
    this.setState(prev => ({
      todoList: prev.todoList.map(each =>
        each.id === id ? {...each, isCompleted: !each.isCompleted} : each,
      ),
    }))
  }

  onUpdateTitle = (id, newTitle) => {
    this.setState(prev => ({
      todoList: prev.todoList.map(each =>
        each.id === id ? {...each, title: newTitle} : each,
      ),
    }))
  }

  render() {
    const {todoList, inputText} = this.state

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Simple Todos</h1>

          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={this.onChangeInput}
              placeholder="Enter todo (or 'task 3')"
            />
            <button onClick={this.onAddTodo}>Add</button>
          </div>

          <ul>
            {todoList.map(eachItem => (
              <TodoItem
                key={eachItem.id}
                todoDetails={eachItem}
                onDelete={this.onDelete}
                onToggleComplete={this.onToggleComplete}
                onUpdateTitle={this.onUpdateTitle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
