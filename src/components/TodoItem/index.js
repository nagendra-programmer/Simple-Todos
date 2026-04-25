import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    isEditing: false,
    editText: '',
  }

  onEditClick = () => {
    const {todoDetails} = this.props
    this.setState({isEditing: true, editText: todoDetails.title})
  }

  onChangeInput = e => {
    this.setState({editText: e.target.value})
  }

  onSave = () => {
    const {editText} = this.state
    const {todoDetails, onUpdateTitle} = this.props

    onUpdateTitle(todoDetails.id, editText)
    this.setState({isEditing: false})
  }

  render() {
    const {todoDetails, onDelete, onToggleComplete} = this.props
    const {id, title, isCompleted} = todoDetails
    const {isEditing, editText} = this.state

    return (
      <li className="todo-item">
        <div className="left-section">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleComplete(id)}
          />

          {isEditing ? (
            <input value={editText} onChange={this.onChangeInput} />
          ) : (
            <p className={isCompleted ? 'completed' : ''}>{title}</p>
          )}
        </div>

        <div>
          {isEditing ? (
            <button type="button" onClick={this.onSave}>
              Save
            </button>
          ) : (
            <button type="button" onClick={this.onEditClick}>
              Edit
            </button>
          )}

          <button type="button" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem
