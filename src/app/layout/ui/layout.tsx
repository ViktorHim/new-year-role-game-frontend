import { Outlet } from "react-router";
import { Header } from "../../../widgets/header";
import { BottomMenu } from "../../../widgets/bottom-menu";
import styles from "./styles.module.css"

export const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header/>
            <main className={styles.main}>
                <Outlet/>
            </main>
            <BottomMenu/>
        </div>
    );
}