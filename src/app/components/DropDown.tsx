import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TDropdown } from "@/types";
import { CaretDownIcon } from "@radix-ui/react-icons";

export default function DropDown({
  props,
  selectedFilter,
  onClick,
}: {
  props: TDropdown[];
  selectedFilter: string;
  onClick: (value: TDropdown) => void;
}) {
  const handleOnClick = (item: TDropdown) => {
    onClick(item);
  };

  console.log("dropdown called", props);

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
          <DropdownMenuGroup className="w-full min-w-[200px] px-2">
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
