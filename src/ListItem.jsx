const ListItem = ({ index, isConcluded, text, concludeTask, deleteTask }) => {
  return (
    <div 
      onDoubleClick={ () => concludeTask(index) }
      className={ isConcluded ? 'todo__list-item concluded' : 'todo__list-item' }>
      <span>{ text }</span>
      <button className="todo__btn-delete" onClick={ () => deleteTask(index) }>Deletar</button>
    </div>
  )
}

export default ListItem