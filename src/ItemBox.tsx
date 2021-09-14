import { FC } from "react";
import { nodeInfo } from './InodeInfo';

interface ItemBoxProps {
    item: nodeInfo,
    checked: string,
    onClickItem: (evt, id: string) => void,
    onDragStart: (id: string) => void,
    onMouseUp: () => void,
    onDragMove: (evt) => void
}

const ItemBox: FC<ItemBoxProps> = ({ item, checked, onDragStart, onClickItem, onMouseUp, onDragMove }): JSX.Element => {
    return (
        <div
            className={`item ${checked === item.id && 'selected'}`}
            onDragStart={() => onDragStart(item.id)}
            draggable
            style={{ top: item.y + 'px', left: item.x + 'px' }}
            onMouseUp={onMouseUp}
            onMouseDown={(e) => onClickItem(e, item.id)}
            onMouseMove={onDragMove}
        >
        </div>
    )
}
export default ItemBox;