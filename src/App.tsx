import { useState } from 'react';
import { FC } from "react";
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ItemBox from './ItemBox';

import { nodeInfo } from './InodeInfo';

const App: FC = () => {
  const [drag, setDrag] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [data, setData] = useState<nodeInfo[]>([]);
  const [checked, setChecked] = useState<string>(" ");

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  }

  /* Start element control functions*/
  const addNode = (): void => {
    let newNode = {
      id: uuidv4(),
      x: 300 + getRandomInt(500),
      y: 200 + getRandomInt(400),
    }
    setData(data => [...data, newNode]);
  }

  const deleteNode = (): void => {
    let id = selectedId;
    let updateData = data.filter((item: any, index: number) => item.id !== id);
    setData(updateData);
    setSelectedId('');
  }
  /* End element control functions*/

  const onClickItem = (evt, id: string) => {
    evt.stopPropagation();
    evt.preventDefault();
    setChecked(id);
    setSelectedId(id);
    setDrag(true);
  }

  const onDragStart = (id: string) => {
    setChecked(id);
    setSelectedId(id);
  }

  const onMouseUp = () => {
    setDrag(false);
  }
  const onDragMove = (evt) => {
    if (drag) {
      setData(prevState => prevState.map(el => el.id === selectedId ? { ...el, x: evt.clientX, y: evt.clientY } : el));
    }
    evt.stopPropagation();
    evt.preventDefault();
  }

  // For the clicking outside of elements
  const onClickOutNode = (evt) => {
    if (evt.target.id === "drop-area") {
      setChecked("");
    }
    evt.stopPropagation();
    evt.preventDefault();
  }

  return (
    <div className="App">
      <button onClick={addNode}>Add Node</button>
      <button onClick={deleteNode} disabled={selectedId === ''}>Remove Node</button>
      <div className="drop-area" id="drop-area" onClick={onClickOutNode}>
        {data && data.map((node: nodeInfo) => (
          <ItemBox
            key={node.id}
            item={node}
            checked={checked}
            onClickItem={onClickItem}
            onDragStart={onDragStart}
            onMouseUp={onMouseUp}
            onDragMove={onDragMove}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
