import React, { useState } from 'react';
import './App.css';
import TagView from './TagView';
import ExportButton from './ExportButton';

const initialTree = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: 'c1-c1 Hello' },
        { name: 'child1-child2', data: 'c1-c2 JS' },
      ],
    },
    { name: 'child2', data: 'c2 World' },
  ],
};

function App() {
  const [tree, setTree] = useState(initialTree);

  const handleUpdate = (tagName, newData) => {
    const updatedTree = { ...tree };
    updateTagData(updatedTree, tagName, newData);
    setTree(updatedTree);
  };

  const updateTagData = (node, tagName, newData) => {
    if (node.name === tagName) {
      node.data = newData;
    } else if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        updateTagData(node.children[i], tagName, newData);
      }
    }
  };

  const handleUpdateTree = (tagName, updatedChildren) => {
    const updatedTree = { ...tree };
    updateChildren(updatedTree, tagName, updatedChildren);
    setTree(updatedTree);
  };

  const updateChildren = (node, tagName, updatedChildren) => {
    if (node.name === tagName) {
      node.children = updatedChildren;
    } else if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        updateChildren(node.children[i], tagName, updatedChildren);
      }
    }
  };

  return (
    <div className="App">
      
      <TagView tag={tree} onUpdate={handleUpdate} treeUpdate={handleUpdateTree} />
      <ExportButton data={tree} />
      <>{JSON.stringify(tree)}</>
    </div>
  );
}


export default App;