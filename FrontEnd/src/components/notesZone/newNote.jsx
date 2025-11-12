function NewNode(){
    return (
        <div className="bg-zinc-800 rounded-lg p-4 border-t-4 border-yellow-400 flex flex-col items-center justify-center text-zinc-400 h-24 cursor-pointer hover:bg-zinc-700 transition-colors shadow-lg">
            <span className="text-4xl">+</span>
            <span className="text-sm mt-1">New Notes</span>
        </div>
    )
}

export default NewNode;