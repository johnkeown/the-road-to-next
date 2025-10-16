import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NewType = {
    label: string;
    icon?: React.ReactElement<SVGElement>;
    button?: React.ReactElement<ButtonProps>;
};

const Placeholder = ({
    label,
    icon = <LucideMessageSquareWarning />,
    button = <div />,
}: NewType) => {
    return (
        <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
            {cloneElement(icon, {
                className: cn("w-16 h-16", icon.props.className),
            })}
            <h2 className="text-lg text-center">{label}</h2>
            {cloneElement(button, {
                className: "h-10",
            })}
        </div>
    );
};

export default Placeholder;
