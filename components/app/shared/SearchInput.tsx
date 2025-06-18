import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchInput() {
  return (
    <form className="max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="size-4 text-black" />
        </div>
        <input
          type="text"
          id="search"
          className="block h-8 w-64 ps-9 text-sm bg-black/5 rounded-lg focus:outline-caribbean"
          placeholder="Search"
          required
        />
      </div>
    </form>
  );
}

export default SearchInput;
