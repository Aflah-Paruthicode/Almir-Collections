import useHandleDragEnd from "../services/useHandleDragEnd";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../components/SortableContext";

const ImagePreviews = ({ images, setImages }) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event) => useHandleDragEnd(event, images, setImages);

  return (
    <div className="preview-container">
      <h1 className="text-2xl font-bold pt-10 pb-4">
        Preview <span className="font-medium text-xl">({images.length})</span>
      </h1>
      <div className="flex items-center ">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-wrap gap-2">
              {images.map((url) => {
                let uniqueId = url.lastModified + url.size;
                return (
                  <div className="relative" key={url.lastModified + url.size}>
                    <button
                      onClick={() =>
                        setImages((prev) =>
                          prev.filter(
                            (url) => url.lastModified + url.size !== uniqueId
                          )
                        )
                      }
                      className="bg-[#000000a7] rounded-[50%] absolute top-0 right-0 cursor-pointer p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="22px"
                        viewBox="0 -960 960 960"
                        width="22px"
                        fill="#e3e3e3"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </button>
                    <SortableItem
                      id={url.lastModified + url.size}
                      url={URL.createObjectURL(url)}
                    />
                  </div>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ImagePreviews;
