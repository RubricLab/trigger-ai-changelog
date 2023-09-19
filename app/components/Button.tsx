import Link, { LinkProps } from "next/link";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
} & React.HTMLAttributes<HTMLButtonElement>;

const classes =
  "flex items-center justify-items-center justify-center w-full max-w-xs font-sans rounded-md transition-all disabled:opacity-50 disabled:pointer-events-none bg-indigo-600 hover:bg-indigo-500 h-10 px-4 font-semibold text-center";

export function Button({
  children,
  onClick,
  disabled,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} ${className}`}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) {
  return (
    <Link {...props} className={classes}>
      {children}
    </Link>
  );
}
