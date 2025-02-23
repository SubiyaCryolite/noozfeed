import { cn } from "@/utils";

interface TabsProps extends React.HTMLProps<HTMLDivElement> {
  border?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const Tabs: React.FC<TabsProps> = ({ children, ref, border, className }) => {
  return (
    <div ref={ref} className={cn("tabs", { "tabs-border": border }, className)}>
      {children}
    </div>
  );
};

export default Tabs;
