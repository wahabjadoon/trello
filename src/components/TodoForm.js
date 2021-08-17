import React, { useState } from 'react';

const TodoForm = ({ listTitle, addTodoTitle }) => {
  const [value, setValue] = useState(listTitle);
  const [showLabel, setShowLabel] = useState(value !== '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      setShowLabel(false);
      return;
    }
    setShowLabel(true);
    addTodoTitle(value);
  };

  let showComponent;

  if (!showLabel) {
    showComponent = (
      <form id="to-do-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Enter Label Text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    );
  } else {
    showComponent = (
      <div>
        <label
          style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: '700',
            padding: '5px',
          }}
        >
          {value}
        </label>
      </div>
    );
  }

  return <div>{showComponent}</div>;
};

export default TodoForm;
