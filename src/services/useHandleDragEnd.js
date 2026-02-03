import { arrayMove } from "@dnd-kit/sortable";

const useHandleDragEnd = (event, images, setImages) => {
  const { active, over } = event;
  if (over && active.id !== over.id) {
    const oldIndex = images.findIndex((url) => url.lastModified + url.size === active.id);
    const newIndex = images.findIndex((url) => url.lastModified + url.size === over.id);
    setImages(arrayMove(images, oldIndex, newIndex));
  }
};

export default useHandleDragEnd;
