import { PUBLIC_URL } from "keycloakify/PUBLIC_URL";

export interface SocialProviderSingpassProps {
    href: string;
    className?: string;
}

export const SocialProviderSingpass = ({ href, className = "" }: SocialProviderSingpassProps) => {
    return (
        <div className="items-center w-full py-1 my-1.5 px-0">
            <a
                href={href}
                className={
                    "flex flex-row items-center justify-center w-full bg-white border border-[#C8C9CC] rounded-lg h-10 px-6 py-0 text-lg font-medium text-black hover:bg-[#F5F5F7] hover:text-black no-underline hover:no-underline " +
                    className
                }
                aria-label="Log in with Singpass"
                title="Log in with Singpass"
            >
                <span style={{ marginRight: '6px' }} className="no-underline hover:no-underline text-black">
                    Log in with
                </span>
                <img
                    src={`${PUBLIC_URL}/img/singpass-logo.svg`}
                    alt="Singpass"
                    role="img"
                    aria-label="Sing pass"
                    style={{ height: '14px', display: 'inline-block', transform: 'translateY(0.12em)' }}
                    className="w-auto align-middle"
                />
            </a>
        </div>
    );
};

export default SocialProviderSingpass;