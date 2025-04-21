import { useState } from "react";

export default function TagsInput({ tags, setTags, placeholder }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full space-y-2">
      <div>
        <h3 className="font-medium">
          Tags<sup className="text-red-500">*</sup>
        </h3>
      </div>
      <div className="flex flex-col w-full gap-2 ">
        <div className="flex items-center flex-1 gap-4">
          <input
            className="flex-1 w-full px-4 py-2 text-sm bg-transparent bg-white border rounded-lg shadow-sm outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Add tag and press Enter"}
          />
          <button
            onClick={addTag}
            className="px-3 py-1 text-sm text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <button
              onClick={() => removeTag(tag)}
              key={tag}
              className="flex items-center px-3 text-sm text-gray-800 bg-gray-100 border rounded-full"
            >
              {tag}
              <span className="ml-2 text-gray-500 hover:text-red-500">×</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
