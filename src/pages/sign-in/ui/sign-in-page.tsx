import { useAuth } from "@/features/auth";
import { Page } from "../../../shared/ui";

export const SignInPage = () => {
const {signIn} = useAuth();
    return (
       <Page>
        Добро пожаловать!
        <button onClick={signIn}>Войти</button>
       </Page>
    );
}