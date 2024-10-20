import ModeToggle from "./modeToggle";
import Avatar from "./svg/avatar";
import MenuBtnIcon from "./svg/menuBtnIcon";

const Header = () => {
    return (
        <div className="flex justify-between items-center mt-3 mx-3">
            <div className="">
                <MenuBtnIcon />
            </div>
            <div className="flex justify-center">
                <Avatar />
                <span>Uroos Fastima</span>
            </div>
            <div className="">
                <ModeToggle />
            </div>
        </div>
    )
}

export default Header;