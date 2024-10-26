import { useState } from "react";
import ModeToggle from "./modeToggle";
import Avatar from "./svg/avatar";
import MenuBtnIcon from "./svg/menuBtnIcon";
import MenuModal from "./menuModal";

const Header = () => {
    const [isShowed, setIsShowed] = useState(false);
    const menuBtnHandle = () => {
        setIsShowed(!isShowed);
    }
    return (
        <div className="flex justify-between items-center pt-3 mx-3">
            <div className="cursor-pointer" onClick={menuBtnHandle}>
                <MenuBtnIcon />
            </div>
            <div className="flex justify-center items-center">
                <Avatar />
                <span className="ml-3 font-bold dark:text-white">Uroos Fastima</span>
            </div>
            <div className="">
                <ModeToggle />
            </div>

            {isShowed && <MenuModal onClose={() => setIsShowed(!isShowed)} />}
        </div>
    )
}

export default Header;