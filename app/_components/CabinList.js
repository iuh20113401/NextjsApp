import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;
  let selectedCabin = cabins;
  if (filter === "all") selectedCabin = cabins;
  if (filter === "small")
    selectedCabin = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    selectedCabin = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );

  if (filter === "large")
    selectedCabin = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {selectedCabin.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
