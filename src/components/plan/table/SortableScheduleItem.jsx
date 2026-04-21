import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleContext } from "./DragHandle";


export const SortableScheduleItem = ({ rowKey, ...rest }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rowKey });

  const style = {
    ...rest.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const memoizedValue = useMemo(
    () => ({ setActivatorNodeRef, listeners, attributes }),
    [setActivatorNodeRef, listeners, attributes],
  );

  return (
    <DragHandleContext.Provider value={memoizedValue}>
      <tr {...rest} style={style} ref={setNodeRef}/>
    </DragHandleContext.Provider>
  );
};
