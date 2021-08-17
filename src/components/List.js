import React from 'react';
import Card from '../components/Card';
import TodoForm from '../components/TodoForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const List = ({
  list,
  index,
  editList,
  setTodosTitle,
  addTodo,
  leftListIndex,
  rightListIndex,
  onMoveCard,
}) => {
  const cards = list.cards;

  const editCard = (cardIndex, cardTitle) => {
    editList(cardTitle, cardIndex, index);
  };

  const addTodoTitle = (listTitle) => {
    setTodosTitle(index, listTitle);
  };

  const add = () => {
    addTodo(index, {
      id: -1,
      title: '',
    });
  };

  const moveCardLeft = (cardIndex) => {
    onMoveCard(index, cardIndex, 'LEFT');
  };

  const moveCardRight = (cardIndex) => {
    onMoveCard(index, cardIndex, 'RIGHT');
  };

  return (
    <div>
      <TodoForm listTitle={list.title} addTodoTitle={addTodoTitle} />
      {cards.map((card, i) => (
        <Card
          key={Math.random() * 100}
          cardIndex={i}
          card={card}
          editCard={editCard}
          canMoveLeft={leftListIndex >= 0 && leftListIndex < rightListIndex}
          canMoveRight={rightListIndex > index}
          onMoveRight={moveCardRight}
          onMoveLeft={moveCardLeft}
        />
      ))}
      <button className="addTodoBtn" onClick={add}>
        Add Todo
        <span>
          <FontAwesomeIcon className="faiconsbtn" icon={faPlus} />
        </span>
      </button>
    </div>
  );
};

export default List;
