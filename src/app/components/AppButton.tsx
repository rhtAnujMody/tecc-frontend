import { ComponentPropsWithRef, HTMLProps } from "react";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  title: string;
  isLink?: boolean;
}

export default function AppButton({
  title,
  isLink = false,
  ...rest
}: ButtonProps) {
  return (
    <button {...rest}>
      {isLink ? (
        <span className="text-textPrimary hover:opacity-80 font-semibold text-base">
          {title}
        </span>
      ) : (
        <div className="bg-primary px-4 py-2 rounded-md text-white hover:opacity-80 font-semibold text-base">
          {title}
        </div>
      )}
    </button>
  );
}
