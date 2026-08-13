import type { MenuProps } from "./types/MenuProps";

export const Menu: React.FC<MenuProps> = ({
  items = ["Work", "Services", "Experience", "Contact"],
  itemCounts = { Work: 2, Services: 2, Experience: 2 },
},) => {
  return (
    <nav className="flex gap-8 items-center">
      {items.map((item:any, index:any) => (
        <a
          key={index}
          href="#"
          className="font-lora text-base font-normal text-[#1A1A1A] hover:opacity-70 transition-opacity flex items-center gap-2 cursor-pointer"
        >
          {item}
          {itemCounts[item] && (
            <span className="text-[#1A1A1A] text-sm font-normal opacity-30">
              [{itemCounts[item]}]
            </span>
          )}
        </a>
      ))}
    </nav>
  );
};

