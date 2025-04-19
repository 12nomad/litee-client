import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchInput() {
  return (
    <form className="max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="size-4 text-black/90" />
        </div>
        <input
          type="text"
          id="search"
          className="block w-full py-1 ps-9 text-sm border border-black/90 rounded-lg focus:outline-black/90"
          placeholder="search..."
          required
        />
      </div>
    </form>
  );
}

export default SearchInput;
