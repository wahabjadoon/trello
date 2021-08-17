import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import '../css/ListItems.css';

const Card = ({
  cardIndex,
  card,
  editCard,
  canMoveLeft,
  canMoveRight,
  onMoveLeft,
  onMoveRight,
}) => {
  const [content, setContent] = useState(card);
  const [isEditEnabled, setIsEditEnabled] = useState(content.title === '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) return;
    setContent({ id: content.id, title: content.title });
    setIsEditEnabled(false);
    editCard(cardIndex, content.title);
  };

  let editCardBody = (
    <form onSubmit={handleSubmit}>
      <textarea
        type="text"
        style={{ width: '95%' }}
        id={content.id}
        value={content.title}
        onChange={(e) => setContent({ id: content.id, title: e.target.value })}
      />
      <button type="Submit">Save</button>
    </form>
  );

  let showCardBody = (
    <div style={{ display: 'flex' }}>
      <label style={{ flexGrow: '1' }}>{content.title}</label>
      <span>
        <FontAwesomeIcon
          className="faicons"
          onClick={() => {
            setIsEditEnabled(true);
          }}
          icon={faEdit}
        />

        {canMoveLeft && (
          <FontAwesomeIcon
            className="faicons"
            onClick={() => {
              onMoveLeft(cardIndex);
            }}
            icon={faAngleLeft}
          />
        )}

        {canMoveRight && (
          <FontAwesomeIcon
            className="faicons"
            onClick={() => {
              onMoveRight(cardIndex);
            }}
            icon={faAngleRight}
          />
        )}
      </span>
    </div>
  );

  return (
    <div className="card">{isEditEnabled ? editCardBody : showCardBody}</div>
  );
};

export default Card;
