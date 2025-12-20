import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import styles from "./styles.module.css"

export const Header = () => {
    return (
        <header className={styles.header}>
            <ArrowRightStartOnRectangleIcon fill="white" style={{width: 20, height: 20}}/>
        </header>
    );
}