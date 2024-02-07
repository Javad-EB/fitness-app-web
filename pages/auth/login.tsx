import Page from "../../components/Page";
import { AuthForm } from "@/components/Forms/AuthForm";
export default function Login() {
    return (
        <Page
            title="Login"
            content="Login to Fitness Website"
        >
            <div className="flex flex-col h-screen items-center justify-center">
                <h1 className="text-3xl font-bold pb-5">Login</h1>
                <AuthForm type="login" />
            </div>
        </Page>
    );
}
