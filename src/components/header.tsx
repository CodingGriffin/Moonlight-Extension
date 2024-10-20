import ModeToggle from "./modeToggle";
import Avatar from "./svg/avatar";
import MenuBtnIcon from "./svg/menuBtnIcon";

const Header = () => {
    return (
        <div className="flex justify-between items-center mt-3 mx-3">
            <div className="">
                <MenuBtnIcon />
            </div>
            <div className="flex justify-center items-center">
                <Avatar />
                <span className="ml-3 font-bold dark:text-white">Uroos Fastima</span>
            </div>
            <div className="">
                <ModeToggle />
            </div>
        </div>
    )
}

export default Header;