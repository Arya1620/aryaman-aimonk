import React, { useState } from 'react';
import './TagView.css';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const TagView = ({ tag, onUpdate, treeUpdate }) => {
  const [children, setChildren] = useState(tag.children || []);
  const [data, setData] = useState(tag.data || '');
  const [collapsed, setCollapsed] = useState(false);
  const [containerColor] = useState(getRandomColor());
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(tag.name);

  const generateChildName = () => {
    if (children.length === 0) {
      return `${editedName}-child1`;
    } else {
      const lastChild = children[children.length - 1];
      const lastIndex = parseInt(lastChild.name.split('-')[1], 10);
      return `${editedName}-child${lastIndex + 1}`;
    }
  };

  
    const handleAddChild = () => {
      const newChild = {
        name: generateChildName(),
        data: 'Data', 
      };
  
      const updatedChildren = children ? [...children, newChild] : [newChild];
      setChildren(updatedChildren)
  
      treeUpdate(tag.name, updatedChildren);
    };
  


  const handleDataChange = (event) => {
    const newData = event.target.value;

    console.log({newData})

    setData(newData);
    onUpdate(tag.name, newData);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleNameEditStart = () => {
    setIsEditingName(true);
  };

  const handleNameEditEnd = () => {
    setIsEditingName(false);
    onUpdate(tag.name, editedName);
  };

  const handleNameInputChange = (event) => {
    setEditedName(event.target.value);
  };

  return (
    <div className="tag-view" style={{ backgroundColor: containerColor }}>
      <div className="tag-header">
        <button className="collapse-button" onClick={handleCollapseToggle}>
          {collapsed ? '▶' : '▼'}
        </button>
        {isEditingName ? (
          <input
            type="text"
            className="tag-name-input"
            value={editedName}
            onChange={handleNameInputChange}
            onBlur={handleNameEditEnd}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleNameEditEnd();
              }
            }}
            autoFocus
          />
        ) : (
          <span className="tag-name" onClick={handleNameEditStart}>
            {editedName}
          </span>
        )}
        <button onClick={handleAddChild} className="add-child-button">
          Add Child
        </button>
      </div>
      {!collapsed && (
        <>
          {data && (
            <input
              type="text"
              className="tag-data"
              value={data}
              onChange={handleDataChange}
            />
          )}
          <div className="tag-children">
            {children.map((child) => (
              <TagView key={child.name} tag={child} onUpdate={onUpdate} treeUpdate={treeUpdate} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TagView;