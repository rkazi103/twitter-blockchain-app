import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";

const style = {
  wrapper: `w-min flex items-center rounded-[100px] p-4 cursor-pointer hover:bg-[#333c45] transition-all hover:duration-200 hover:ease-in-out`,
  iconContainer: `text-xl mr-4`,
  textGeneral: `font-medium`,
  textActive: `font-bold`,
};

const SidebarOption = ({ text, Icon, isActive, setSelected, redirect }) => {
  const router = useRouter();

  return (
    <div
      className="flex w-min cursor-pointer items-center rounded-[100px] p-4 transition-all hover:bg-[#333c45] hover:duration-200 hover:ease-in-out"
      onClick={() => {
        setSelected(text);
        if (redirect) router.push(redirect);
      }}
    >
      <div className="mr-4 text-xl">
        <Icon />
      </div>

      <div className={`${isActive ? "font-bold" : "font-medium"}`}>{text}</div>
    </div>
  );
};

export default SidebarOption;
