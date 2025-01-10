"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParam.get("capacity") ?? "all";
  function handleFilter(filterValue) {
    const params = new URLSearchParams(searchParam);
    params.set("capacity", filterValue);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="flex border border-primary-800">
      <Button
        filterValue={"all"}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All cabins
      </Button>
      <Button
        filterValue={"small"}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1&mdash;3 guest
      </Button>
      <Button
        filterValue={"medium"}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4&mdash;7 guest
      </Button>
      <Button
        filterValue={"large"}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        8&mdash;12 guest
      </Button>
    </div>
  );
}
function Button({ filterValue, activeFilter, handleFilter, children }) {
  return (
    <button
      className={`${activeFilter === filterValue ? "bg-primary-700" : ""} px-5 py-2 hover:bg-primary-700 `}
      onClick={() => handleFilter(filterValue)}
    >
      {children}
    </button>
  );
}
export default Filter;
