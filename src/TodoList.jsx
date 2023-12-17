import React, { useState, useEffect } from "react";
import todoImg from './assets/todo_img.svg'
import './TodoList.css'
import ListItem from "./ListItem";

const TodoList = () => {
  const storageList = JSON.parse(localStorage.getItem('List'))
  
  const [list, setList] = useState(storageList || [])

  const addListInLocalStorage = () => {
    localStorage.setItem('List', JSON.stringify(list))

    if (!list.length) {
      localStorage.removeItem('List')
    }
  }

  const addNewValueInList = event => {
    event.preventDefault()
    const form = event.target
    const inputValue = form.input.value.trim()
    
    if (inputValue) {
      setList([{ text: inputValue, isConcluded: false }, ...list]) 
    }
    
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

  const getTodoListItem = ({ text, isConcluded }, index) => 
    <ListItem 
    key={ index }
    index={ index } 
    text={ text } 
    isConcluded={ isConcluded } 
    concludeTask={ concludeTask } 
    deleteTask={ deleteTask } /> 

  useEffect(addListInLocalStorage, [list])

  return (
    <div className="todo">
      <h1 className="todo__title">Lista de Tarefas</h1>
      <form className="todo__form" onSubmit={ addNewValueInList }>
        <input className="todo__input" id="input" type="text" placeholder="Adicione uma tarefa" />
        <button className="todo__btn-add" type="submit">Add</button>
      </form>
      <div className="todo__list">
        { list.length ? list.map(getTodoListItem) : <img src={ todoImg } alt="Imagem de uma ToDo List" /> }
        { list.length > 1 && <button className="todo__btn-deleteAll" onClick={ deleteAll }>Deletar Todas</button> }
      </div>
    </div>
  )
}

export default TodoList