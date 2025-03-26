import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, Search, Compass } from "lucide-react";

const subjects = [
  { name: "Mathematics", subSubjects: ["Algebra", "Geometry", "Calculus"] },
  { name: "Science", subSubjects: ["Physics", "Chemistry", "Biology"] },
  { name: "Computer Science", subSubjects: ["Programming", "Data Structures", "Algorithms"] },
];

export default function Sidebar() {
  const [openSubject, setOpenSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSubject = (subject) => {
    setOpenSubject(openSubject === subject ? null : subject);
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Subjects List */}
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <BookOpen className="mr-2" /> Subjects
      </h2>
      <ul className="flex-grow overflow-y-auto">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <li key={subject.name} className="mb-2">
              <button
                onClick={() => toggleSubject(subject.name)}
                className="w-full flex justify-between items-center p-2 bg-gray-800 hover:bg-gray-700 rounded"
              >
                {subject.name}
                {openSubject === subject.name ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
              {openSubject === subject.name && (
                <ul className="ml-4 mt-2 space-y-2">
                  {subject.subSubjects.map((sub, index) => (
                    <li key={index} className="p-2 bg-gray-700 rounded">{sub}</li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No subjects found</p>
        )}
      </ul>

      {/* Explore More Button */}
      <button className="flex items-center justify-center mt-4 p-3 bg-blue-500 hover:bg-blue-600 rounded text-white font-bold transition">
        <Compass className="mr-2" size={20} /> Explore More
      </button>
    </div>
  );
}