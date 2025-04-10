import style from './header.module.css'
import { NavLink } from "react-router";



export const Header = () => {
    return (
        <header className={style.header}>
            <nav>
                <ul className={style.navBTN}>
                    <li> <NavLink className={({ isActive }) =>
                        isActive ? style.active : undefined
                    } to={'/'}>Home</NavLink> </li>
                    <li> <NavLink className={({ isActive }) =>
                        isActive ? style.active : undefined
                    } to={'products'}>Products</NavLink> </li>
                </ul>
            </nav>
        </header>
    );
};

