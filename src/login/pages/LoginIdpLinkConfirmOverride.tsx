import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "../../components/ui/button";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";

export default function LoginIdpLinkConfirmOverride(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm-override.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, idpDisplayName } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("confirmOverrideIdpTitle")}>
            <form id="kc-register-form" action={url.loginAction} method="post">
                {msg("pageExpiredMsg1")}{" "}
                <a id="loginRestartLink" href={url.loginRestartFlowUrl} className={cn(buttonVariants({ variant: "link" }), "underline px-1")}>
                    {msg("doClickHere")}
                </a>
                <br />
                <br />
                <Button
                    type="submit"
                    className="w-full"
                    name="submitAction"
                    id="confirmOverride"
                    value="confirmOverride"
                >
                    {msg("confirmOverrideIdpContinue", idpDisplayName)}
                </Button>
            </form>
        </Template>
    );
}
