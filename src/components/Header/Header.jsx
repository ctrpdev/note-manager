import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo"
import s from "./style.module.css";
import logo from "@/assets/images/logo.png"
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/auth/auth-selectors";
import {AuthAPI} from "../../api/authAPI"
import { setUser } from "../../store/auth/auth-slice";

export function Header(props) {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    
    const signout = () => {
        AuthAPI.signout()
        dispatch(setUser(null))
    }
    const renderAuthProfile = () => {

        return (
            <div>
                <img src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}`} 
                style={{width:40}}
                className="rounded-circle"
                alt="avatar picture" />
                <div>Hello, {user.email}</div>
                <Link to="#"
                onClick={signout}
                >Signout</Link>
            </div>
        )
    }

    return (
        <div className={`row ${s.container}`}>
            <div className="col-xs-12 col-sm-4">
                <Logo 
                onClick={()=>navigate("/")}
                title={"Notes manager"} 
                subtitle={"Manage your notes"} 
                image={logo} />
            </div>
            <div className="col-xs-12 col-sm-8 text-end">
                {renderAuthProfile()}
            </div>
        </div>
    )
}