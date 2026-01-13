import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/WebauthnRegister.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { buttonVariants, Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { checkboxVariants } from "../../components/ui/checkbox";

export default function WebauthnRegister(props: PageProps<Extract<KcContext, { pageId: "webauthn-register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { url, isSetRetry, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({
        authButtonId,
        kcContext,
        i18n
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <>
                    <span className={kcClsx("kcWebAuthnKeyIcon")} />
                    {msg("webauthn-registration-title")}
                </>
            }
        >
            <form id="register" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="attestationObject" name="attestationObject" />
                    <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
                    <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
                    <input type="hidden" id="transports" name="transports" />
                    <input type="hidden" id="error" name="error" />
                    <LogoutOtherSessions i18n={i18n} />
                </div>
            </form>
            <div className="responsive-container ">
                <input
                    type="submit"
                    className={cn(buttonVariants({}), "w-full")}
                    id={authButtonId}
                    value={msgStr("doRegisterSecurityKey")}
                />

                {!isSetRetry && isAppInitiatedAction && (
                    <form action={url.loginAction} className="all-unset w-full !p-0 " id="kc-webauthn-settings-form" method="post">
                        <Button
                            type="submit"
                            variant="outline"
                            className="w-full"
                            id="cancelWebAuthnAIA"
                            name="cancel-aia"
                            value="true"
                        >
                            {msg("doCancel")}
                        </Button>
                    </form>
                )}
            </div>
        </Template>
    );
}

function LogoutOtherSessions(props: { i18n: I18n }) {
    const { i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className="ml-6">
            <div>
                <div>
                    <div className="flex items-center space-x-4">
                        <input
                            type="checkbox"
                            id="logout-sessions"
                            name="logout-sessions"
                            value="on"
                            defaultChecked={true}
                            className={cn(checkboxVariants(), "bg-black")}
                        />
                        <span>{msg("logoutOtherSessions")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
