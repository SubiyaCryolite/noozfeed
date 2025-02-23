import { cn } from "@/utils";

interface TabProps extends React.HTMLProps<HTMLInputElement> {
  active?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
  ContentProps?: React.HTMLProps<HTMLDivElement>;
}

export const Tab: React.FC<TabProps> = ({
  active = false,
  disabled,
  children,
  ref,
  className,
  label,
  ContentProps,
  ...props
}) => {
  const { className: contentClassName, ...contentProps } = ContentProps || {};

  return (
    <>
      <input
        ref={ref}
        type="radio"
        className={cn(
          "tab",
          { "tab-active": active },
          { "tab-disabled": disabled },
          className,
        )}
        aria-label={label}
        {...props}
      />
      <div className={cn("tab-content", contentClassName)} {...contentProps}>
        {children}
      </div>
    </>
  );
};

export default Tab;
