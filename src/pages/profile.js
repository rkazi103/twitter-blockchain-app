import Sidebar from "../containers/Sidebar";
import Widgets from "../containers/Widgets";

const Profile = () => {
  return (
    <div className="flex h-screen w-screen select-none justify-center bg-[#15202b] text-white">
      <div className="flex w-3/4 max-w-[1400px] justify-between">
        <Sidebar />
        <div className="flex-[2] overflow-y-scroll border-r border-l border-[#38444d] scrollbar-hide"></div>
        <Widgets />
      </div>
    </div>
  );
};

export default Profile;
