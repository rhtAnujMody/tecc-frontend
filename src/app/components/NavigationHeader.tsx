import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";

export default function NavigationHeader({
  main,
  secondary,
  onClick,
}: {
  main: string;
  secondary?: string;
  onClick: () => void;
}) {
  return (
    <div className="flex text-text-primary text-base font-medium items-center bg-white sticky top-0 z-50">
      {secondary && (
        <Button variant={"ghost"} onClick={onClick}>
          <ArrowLeftIcon className="mr-1" />
        </Button>
      )}

      <span>{main}</span>
      {secondary && (
        <>
          <ChevronRightIcon
            className="mx-1"
            style={{ width: 20, height: 20, color: "#344054" }}
          />
          <span>{secondary}</span>
        </>
      )}
    </div>
  );
}
