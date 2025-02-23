import { cn } from "@/utils";

interface TabProps extends React.HTMLProps<HTMLAnchorElement> {
  active?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
}

export const Tab: React.FC<TabProps> = ({
  active = false,
  disabled,
  children,
  ref,
  className,
  ...props
}) => {
  return (
    <a
      ref={ref}
      role="tab"
      className={cn(
        "tab",
        { "tab-active": active },
        { "tab-disabled": disabled },
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
};

export default Tab;
