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

export function Signup(){
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, serPassword] = useState("");
    const [password2, serPassword2] = useState("");
    const navigate = useNavigate();
    const submit = async (e)=>{
        e.preventDefault();
        if(password === password2){
            try{
                const user = await AuthAPI.signup(email, password);
                dispatch(setUser(user));
                await toast("success", "Sign Up succeed, you are now logged in");
                navigate("/");
            } catch (error) {
                toast("error", error.message);
            }
        } else {
            toast("error", "Password don't match");
        }
    }

    const form = (
        <div className={s.formContainer}>
            <h2 className={s.title}>
            Sign Up<br />
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
                <Input 
                placeholder="Password (repeat)" 
                type="password"
                onTextChange={serPassword2}
                />
                <ButtonPrimary
                type="submit"
                className={s.button}>Sign Up!</ButtonPrimary>
                <span>Already have an account? <Link to={"/signin"}>Sign In</Link></span>
            </form>
        </div>
    )
    return (
        <AuthLayout>
        {form}
        </AuthLayout>
    )
}