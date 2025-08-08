import LoginForm from "@/components/LoginForm";

export default function Login() {

    return (

        <div className='relative flex min-h-screen items-center justify-center overflow-hidden p-4'>
            <div className="absolute inset-0 bg-background">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#D3A23721] to-[#F9151569] rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#F9151569] to-[#D3A23721] rounded-full blur-3xl" />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <LoginForm />

        </div>
    );
}
