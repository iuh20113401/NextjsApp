import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="w-100 grid grid-cols-[16rem_1fr] h-full gap-12">
      <div>
        <SideNavigation />
      </div>
      <div className="py-1">{children}</div>
    </div>
  );
}
