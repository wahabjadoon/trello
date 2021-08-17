import React from 'react';
import '../css/App.css';
import List from '../components/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {
  const localState = JSON.parse(localStorage.getItem('state')) || [];
  const [lists, setLists] = React.useState(localState);

  const setLocalStorage = (lists) => {
    const serializedState = JSON.stringify(lists);
    localStorage.setItem('state', serializedState);
  };

  const setTodosTitle = (listIndex, listTitle) => {
    const selectedList = lists[listIndex];
    selectedList.title = listTitle;

    setLists(
      [...lists].map((list, i) => {
        if (i === listIndex) {
          return selectedList;
        } else return list;
      })
    );

    setLocalStorage(lists);
  };

  const editList = (text, index, listIndex) => {
    const selectedList = [...lists][listIndex];
    let selectedCard = selectedList.cards[index];

    if (selectedCard != null) {
      selectedCard.title = text;
      selectedList.cards[index] = selectedCard;
    } else {
      selectedCard = { id: 1, title: text };
      selectedList.cards.push(selectedCard);
    }

    setLists(
      [...lists].map((list, i) => {
        if (i === listIndex) {
          return selectedList;
        } else return list;
      })
    );

    setLocalStorage(lists);
  };

  const addNewList = () => {
    const list = {
      id: Number,
      title: String,
      cards: [],
    };

    setLists([...lists, list]);
    setLocalStorage(lists);
  };

  const addTodo = (listIndex, card) => {
    const selectedList = [...lists][listIndex];
    selectedList.cards.push(card);

    setLists(
      [...lists].map((list, i) => {
        if (i === listIndex) {
          return selectedList;
        } else return list;
      })
    );
    setLocalStorage(lists);
  };

  const handleMoveCard = (listIndex, cardIndex, direction) => {
    if (direction === 'LEFT') {
      const currentList = [...lists][listIndex];
      const targetList = [...lists][listIndex - 1];
      const cardToMove = currentList.cards[cardIndex];
      targetList.cards.push(cardToMove);
      currentList.cards.splice(cardIndex, 1);

      const newList = [...lists].map((list, i) => {
        if (i === listIndex) return currentList;
        else if (i === listIndex - 1) return targetList;
        else return list;
      });
      setLists([...newList]);
    } else {
      const currentList = [...lists][listIndex];
      const targetList = [...lists][listIndex + 1];
      const cardToMove = currentList.cards[cardIndex];
      targetList.cards.push(cardToMove);
      currentList.cards.splice(cardIndex, 1);

      const newList = [...lists].map((list, i) => {
        if (i === listIndex) return currentList;
        else if (i === listIndex + 1) return targetList;
        else return list;
      });
      setLists([...newList]);
    }
    setLocalStorage(lists);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '25px',
          fontSize: '32px',
          color: 'white',
        }}
      >
        Trello Clone
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '25px',
        }}
      >
        <button className="addBtn" onClick={addNewList}>
          Add List
          <span>
            <FontAwesomeIcon className="faiconsbtn" icon={faPlus} />
          </span>
        </button>
      </div>
      <div className="app">
        <div className="container">
          {lists.map((list, index) => {
            let leftListIndex = index - 1;
            let rightListIndex =
              lists[index + 1] === undefined ? index : index + 1;
            return (
              <div key={Math.random() * 100} className="item">
                <List
                  list={list}
                  index={index}
                  editList={editList}
                  setTodosTitle={setTodosTitle}
                  addTodo={addTodo}
                  leftListIndex={leftListIndex}
                  rightListIndex={rightListIndex}
                  onMoveCard={handleMoveCard}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
