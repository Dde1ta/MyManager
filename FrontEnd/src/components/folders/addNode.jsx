const AddFolderCard = ({ onClick }) => {
  const PlusIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );

  return (
    <div
      onClick={onClick}
      className="bg-zinc-800 rounded-lg p-5 shadow-lg flex items-center justify-center h-32
               cursor-pointer transition-colors border-4 border-dashed border-zinc-700 
               hover:border-zinc-600 hover:bg-zinc-700"
    >
      <div className="text-zinc-500">
        <PlusIcon />
      </div>
    </div>
  );
};

export default AddFolderCard;
