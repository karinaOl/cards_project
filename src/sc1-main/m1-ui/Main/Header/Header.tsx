import { NavLink } from "react-router-dom";
import { PATH } from "../Pages";
import style from "./Header.module.css";

export const Header = () => {
    return (
        <div className={style.navbar}>
            <NavLink
                to={PATH.LOGIN}
                className={({ isActive }) =>
                    isActive ? `${style.item} ${style.active}` : style.item
                }
            >
                login
            </NavLink>
            <NavLink
                to={PATH.NEW_PASSWORD}
                className={({ isActive }) =>
                    isActive ? `${style.item} ${style.active}` : style.item
                }
            >
                new password
            </NavLink>
            <NavLink
                to={PATH.RECOVERY_PASSWORD}
                className={({ isActive }) =>
                    isActive ? `${style.item} ${style.active}` : style.item
                }
            >
                recovery password
            </NavLink>
            <NavLink
                to={PATH.REGISTRATION}
                className={({ isActive }) =>
                    isActive ? `${style.item} ${style.active}` : style.item
                }
            >
                registration
            </NavLink>
            <NavLink
                to={PATH.PROFILE}
                className={({ isActive }) =>
                    isActive ? `${style.item} ${style.active}` : style.item
                }
            >
                profile
            </NavLink>
            <NavLink
                to={PATH.PACKS}
                className={({ isActive }) =>
                    isActive ? `${style.item} ${style.active}` : style.item
                }
            >
                packs
            </NavLink>
            <NavLink
                to={PATH.CARDS}
                className={({ isActive }) =>
                    isActive ? `${style.item} ${style.active}` : style.item
                }
            >
                cards
            </NavLink>
            <NavLink
                to={PATH.TEST}
                className={({ isActive }) =>
                    isActive ? `${style.item} ${style.active}` : style.item
                }
            >
                test
            </NavLink>
        </div>
    );
};
