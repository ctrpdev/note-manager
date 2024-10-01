import { ButtonPrimary } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import s from "./style.module.css";
import { Input } from "@/components/Input/Input";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import { useState } from "react";
import { AuthAPI } from "../../api/authAPI";
import { setUser } from "../../store/auth/auth-slice";
import { useDispatch } from "react-redux";
import { toast } from "../../utils/sweetalert";

export function Signin(){
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, serPassword] = useState("");
    const navigate = useNavigate();
    const submit = async (e)=>{
        e.preventDefault();
        try{
            const user = await AuthAPI.signin(email, password);
            dispatch(setUser(user));
            await toast("success", "Auth succeed");
            navigate("/");
        } catch (error) {
            toast("error", error.message);
        }
    }

    const form = (
        <div className={s.formContainer}>
            <h2 className={s.title}>
            Sign In<br />
            to acces your team notes
            </h2>
            <form onSubmit={submit} className={s.formGroup}>
                <Input 
                placeholder="Email"
                onTextChange={setEmail}
                />
                <Input 
                placeholder="Password" 
                type="password"
                onTextChange={serPassword}
                />
                <ButtonPrimary
                type="submit"
                className={s.button}>Sign in!</ButtonPrimary>
                <span>Don't have an account yet? <Link to={"/signup"}>Sign Up</Link></span>
            </form>
        </div>
    )
    return (
        <AuthLayout>
        {form}
        </AuthLayout>
    )
}