import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (message.trim() || file) {
      onSend({ text: message, file });
      setMessage(""); // Clear input
      setFile(null);  // Clear file
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="flex items-center p-4 bg-white border-t shadow-md">
      {/* File Upload Button */}
      <label className="cursor-pointer p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
        <Paperclip size={20} />
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Input Field */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 mx-2 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* File Name Display */}
      {file && (
        <span className="text-sm text-gray-600 mr-2 truncate max-w-[150px]">
          {file.name}
        </span>
      )}

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        <Send size={20} />
      </button>
    </div>
  );
}