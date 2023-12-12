import React, { useState, useEffect } from "react";
import todoImg from './assets/todo_img.svg'
import './TodoList.css'

const TodoList = () => {
  const storageList = localStorage.getItem('List')
  
  const [list, setList] = useState(storageList ? JSON.parse(storageList) : [])

  const addListInLocalStorage = () => {
    localStorage.setItem('List', JSON.stringify(list))
  }

  const addNewValueInList = event => {
    event.preventDefault()
    const form = event.target
    const inputValue = form.input.value.trim()
    
    if (!inputValue) {
      return  
    }
    
    setList([{ text: inputValue, isConcluded: false }, ...list])

    form.reset()
    form.input.focus()
  }

  const concludeTask = index => {
    const newList = [...list]
    newList[index].isConcluded = !newList[index].isConcluded
    setList(newList)
  }

  const deleteTask = index => {
    const newList = [...list]
    newList.splice(index, 1)
    setList(newList)
  }

  const deleteAll = () => {
    setList([])
  }

  const getTodoListItem = ({ text, isConcluded }, index) => (
    <div 
      key={index}
      onDoubleClick={ () => concludeTask(index) }
      className={ isConcluded ? 'todo__list-item concluded' : 'todo__list-item' }>
      <span>{ text }</span>
      <button className="todo__btn-delete" onClick={ () => deleteTask(index) }>Deletar</button>
    </div>
    )
  
  const getTodoListItensOrTodoImg = listLength => {
    if (listLength) {
      return list.map(getTodoListItem)
    }

    return <img src={ todoImg } alt="Imagem de uma ToDo List" />
  }

  const getBtnDeleteAll = listLength => listLength > 1 
    && <button className="todo__btn-deleteAll" onClick={ deleteAll }>Deletar Todas</button>
  

  useEffect(addListInLocalStorage, [list])

  return (
    <div className="todo">
      <h1 className="todo__title">Lista de Tarefas</h1>
      <form className="todo__form" onSubmit={ addNewValueInList }>
        <input className="todo__input" id="input" type="text" placeholder="Adicione uma tarefa" />
        <button className="todo__btn-add" type="submit">Add</button>
      </form>
      <div className="todo__list">
        { 
          getTodoListItensOrTodoImg(list.length) 
        }
        {
          getBtnDeleteAll(list.length)
        }
      </div>
    </div>
  )
}

export default TodoList