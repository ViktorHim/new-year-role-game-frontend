import type { ReactNode } from "react"
import classnames from 'classnames';
import styles from './styles.module.css' 

interface PageProps {
    children: ReactNode;
    classname?: string; 
}

export const Page = ({children, classname} : PageProps) => {
    return <div className={classnames(styles.page, classname)}>{children}</div>
}