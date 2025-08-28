import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragDropImagePreview = () => {
  const [images, setImages] = useState([
    { id: "1", url: "https://placekitten.com/200/200" },
    { id: "2", url: "https://placekitten.com/201/200" },
    { id: "3", url: "https://placekitten.com/202/200" },
  ]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setImages(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="image-list">
        {(provided) => (
          <div
            className="flex gap-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {images.map((img, idx) => (
              <Draggable key={img.id} draggableId={img.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img
                      src={img.url}
                      alt="preview"
                      className="w-32 h-32 object-cover rounded-xl shadow-md"
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropImagePreview;