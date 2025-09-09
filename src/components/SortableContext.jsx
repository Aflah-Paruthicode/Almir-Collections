import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const SortableItem = ({ id, url }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=""
    >
      <img
        src={url}
        alt="drag-img"
        className="w-20 h-20 object-cover rounded-xl border-2 border-[#bababa] p-2 shadow-md cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};

export default SortableItem;
