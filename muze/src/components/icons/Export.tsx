import react from 'react';
import { icons, IconName } from "./Icons";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    color?: string;
    size?: number;
    pad: string;
}

export default function Icon({ name, size = 24, color = 'currentColor', pad = '0 5px'}: IconProps) {
    const SvgIcon = icons[name];

    if (!SvgIcon) {
        console.log("SvgIcon not found.")
        return null
    }

    return (
        <div style={{width: size, height: size, color, padding: pad}}>
            <SvgIcon />
        </div>
    )
}