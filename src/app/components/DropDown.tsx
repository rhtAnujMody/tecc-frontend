import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TDropdown } from "@/types";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function DropDown({
  props,
  selectedFilter,
  onClick,
}: {
  props: TDropdown[];
  selectedFilter: string;
  onClick: <T>(value: T) => void;
}) {
  const [filter, setFilter] = useState<TDropdown>({ id: "", name: "View All" });

  const handleOnClick = <T,>(item: T) => {
    setFilter(item as TDropdown);
    onClick(item);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-fit min-w-[200px] border p-3 rounded-md flex flex-1 justify-between items-center">
            <span className="text-sm font-medium">{selectedFilter}</span>
            <CaretDownIcon width={20} height={20} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup className="w-full px-2">
            <DropdownMenuItem
              onClick={() => {
                handleOnClick({ id: "", name: "View All" });
              }}
              className="text-sm font-medium text-text-primary"
            >
              View All
            </DropdownMenuItem>
            {props.map((value) => {
              return (
                <DropdownMenuItem
                  onClick={() => {
                    handleOnClick(value);
                  }}
                  className="text-sm font-medium text-text-primary"
                  key={value.name}
                >
                  {value.name}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
