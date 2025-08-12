import React from "react";

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, setDarkMode }) => (
  <div className="flex justify-end mb-4">
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className={`px-4 py-2 rounded transition text-sm cursor-pointer ${
        darkMode
          ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
      aria-label="Alternar modo escuro/claro"
    >
      {darkMode ? (
        <i className="fa-solid fa-lightbulb"></i>
      ) : (
        <i className="fa-solid fa-moon"></i>
      )}
    </button>
  </div>
);

export default DarkModeToggle;