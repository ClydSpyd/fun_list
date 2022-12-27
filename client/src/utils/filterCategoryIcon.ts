import { HiUser } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { IoMdPricetag } from "react-icons/io";
import { IconType } from "react-icons/lib";

export const filterCategoryItem = (catagory: string) => {
    const icons : {[index: string]: IconType} = {
        'submittedBy': HiUser,
        'complete': TiTick,
        'tag': IoMdPricetag,
    }

    return icons[catagory];
}
