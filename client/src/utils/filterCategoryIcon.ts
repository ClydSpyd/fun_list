import { HiUser } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { IoMdPricetag } from "react-icons/io";
import { IconType } from "react-icons/lib";
import { ReactNode } from "react";

export const filterCategoryItem = (category: string) => {
    type Icon = IconType | ReactNode;
    console.log(category);
    const icons : {[index: string]: Icon}  = {
        'submittedBy': HiUser,
        'complete': TiTick,
        'tags': IoMdPricetag,
    }
    
    console.log(icons);
    console.log(icons[category] as ReactNode);
    return icons[category] as ReactNode;
}
