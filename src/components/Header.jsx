import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Header({ onAddNewJob }) {
  // Get the user and logout function from the context
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-4xl md:text-5xl font-semibold">Job Tracker</h1>

      <div>
        {user ? (
          // If a user is logged in, show their email and a Logout button
          <div className="flex items-center gap-4">
            <span className="text-gray-600 hidden sm:block">{user.email}</span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm md:text-base font-medium bg-red-500 hover:bg-red-600 rounded-lg text-white"
            >
              Logout
            </button>
            <button
              onClick={onAddNewJob}
              className="px-4 py-2 text-sm md:text-base font-medium bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
            >
              Add New Job
            </button>
          </div>
        ) : // If no user is logged in, you could show Login/Register buttons here in the future
        // For now, we'll just leave it empty or show nothing.
        null}
      </div>
    </header>
  );
}
