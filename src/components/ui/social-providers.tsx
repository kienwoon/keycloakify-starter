// lightweight social providers component — avoid importing unused helpers
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import SocialProviderSingpass from "./social-provider-singpass";

export interface SocialProvidersProps {
    social:
        | {
              providers?: Array<{
                  alias: string;
                  loginUrl: string;
                  displayName: string;
                  iconClasses?: string;
              }>;
          }
        | undefined;
    //kcClsx: (...args: any[]) => string;
    clsx: (...args: any[]) => string;
    msg: any;
    realm: {
        password: boolean;
    };
}

export const SocialProviders = ({
    social,
    //kcClsx,
    clsx,
    msg,
    realm
}: SocialProvidersProps) => {
    const providers = social?.providers || [];

    return (
        realm.password &&
        providers.length > 0 && (
            <>
                {realm.password &&
                    social?.providers !== undefined &&
                    social.providers.length !== 0 && (
                        <div id="kc-social-providers" className="mt-5 space-y-7">
                            <h2 className="text-center text-lg mt-7">
                                {msg("identity-provider-login-label")}
                            </h2>
                            <div className="space-y-3">
                                {/** Render Singpass as first, full-width button if present **/}
                                {providers
                                    .filter(p => p.alias === "singpass" || p.displayName?.toLowerCase().includes("singpass"))
                                    .map(p => (
                                        <div key={p.alias} className="items-center w-full">
                                            <SocialProviderSingpass href={p.loginUrl} />
                                        </div>
                                    ))}

                                {/** Render remaining providers in grid (excluding singpass) **/}
                                <div
                                    className={clsx(
                                        "text-lg grid gap-2 grid-cols-1",
                                        providers.filter(p => !(p.alias === "singpass" || p.displayName?.toLowerCase().includes("singpass"))).length > 1
                                            ? "md:grid-cols-2"
                                            : "grid-cols-1"
                                    )}
                                >
                                    {providers
                                        .filter(p => !(p.alias === "singpass" || p.displayName?.toLowerCase().includes("singpass")))
                                        .map((...[p,]) => (
                                            <div
                                                key={p.alias}
                                                className=" items-center bg-accent  w-full py-1 my-1.5 border rounded-lg px-3 hover:bg-primary hover:text-primary-foreground"
                                            >
                                                <a
                                                    id={`social-${p.alias}`}
                                                    className="flex flex-row items-center justify-center  w-full py-2 "
                                                    type="button"
                                                    href={p.loginUrl}
                                                >
                                                    {p.iconClasses ? <i className={clsx(p.iconClasses)} aria-hidden="true"></i> : null}
                                                    <span
                                                        className="mx-3"
                                                        dangerouslySetInnerHTML={{
                                                            __html: kcSanitize(p.displayName)
                                                        }}
                                                    ></span>
                                                </a>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}
            </>
        )
    );
};

export default SocialProviders;
