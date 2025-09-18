export default function NavBar() {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-semibold">Job Tracker</h1>
      <button className="px-4 py-2 text-sm md:text-base font-medium bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer transition-colors duration-300">
        Add New Job
      </button>
    </header>
  );
}
