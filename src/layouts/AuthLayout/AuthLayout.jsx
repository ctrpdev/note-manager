import {LogoSVG} from '@/components/LogoSVG/LogoSVG';
import s from "./style.module.css";

export function AuthLayout({children}){
    const header = (
        <div className={s.header}>
            <div className={s.logoTop}>

            <LogoSVG width="30px" height="30px" fill="#0d6efd" />
            </div>
            <h3 className={s.logoTitle}>Note manager</h3>
        </div>
    )

    const background = (
        <div>
            <div className='d-flex'>
                <div className={s.bgLogo}>
            <LogoSVG width="45px" height="45px" />
                </div>
            <h1 className={s.bgTitle}>Note manager</h1>
            </div>
            <p className='text-white'>One place for the team notes</p>
        </div>
    )

    return (
        <div className={s.root}>
            <div className={s.leftSection}>
                {header}
                {children}
            </div>

            <div className={`${s.rightSection} d-none d-lg-flex`}>
                {background}
            </div>
        </div>
    )
}