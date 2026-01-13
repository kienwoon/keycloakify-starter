import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/LoginRecoveryAuthnCodeConfig.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { checkboxVariants } from "../../components/ui/checkbox";
import { buttonVariants, Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

export default function LoginRecoveryAuthnCodeConfig(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-config.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { recoveryAuthnCodesConfigBean, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const olRecoveryCodesListId = "kc-recovery-codes-list";

    useScript({ olRecoveryCodesListId, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("recovery-code-config-header")}
        >
            <div className="space-y-3">
                <div className={clsx("pf-c-alert", "pf-m-warning", "pf-m-inline", kcClsx("kcRecoveryCodesWarning"))} aria-label="Warning alert">
                    <div className="pf-c-alert__icon">
                        <i className="pficon-warning-triangle-o" aria-hidden="true" />
                    </div>
                    <h4 className="pf-c-alert__title">
                        <span className="pf-screen-reader">Warning alert:</span>
                        {msg("recovery-code-config-warning-title")}
                    </h4>
                    <div className="pf-c-alert__description">
                        <p>{msg("recovery-code-config-warning-message")}</p>
                    </div>
                </div>

                <ol id={olRecoveryCodesListId} className="border rounded-md ">
                    {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map((code, index) => (
                        <li key={index}>
                            <span>{index + 1}:</span> {code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}
                        </li>
                    ))}
                </ol>

                {/* actions */}
                <div className="responsive-container ">
                    <Button id="printRecoveryCodes" variant="secondary" size="lg" type="button" className="flex-1 px-2">
                        <i className="pficon-print" aria-hidden="true" /> <span className="mx-2 py-2">{msg("recovery-codes-print")}</span>
                    </Button>
                    <Button id="downloadRecoveryCodes" variant="secondary" size="lg" type="button" className="flex-1 px-2">
                        <i className="pficon-save" aria-hidden="true" /> <span className="mx-2 py-2">{msg("recovery-codes-download")}</span>
                    </Button>
                    <Button id="copyRecoveryCodes" variant="secondary" size="lg" type="button" className="flex-1 px-2">
                        <i className="pficon-blueprint" aria-hidden="true" /> <span className="mx-2 py-2">{msg("recovery-codes-copy")}</span>
                    </Button>
                </div>

                {/* confirmation checkbox */}
                <div className="flex space-x-2 items-center">
                    <input
                        className={cn(checkboxVariants({}), "!py-0")}
                        type="checkbox"
                        id="kcRecoveryCodesConfirmationCheck"
                        name="kcRecoveryCodesConfirmationCheck"
                        onChange={event => {
                            //@ts-expect-error: This is inherited from the original code
                            document.getElementById("saveRecoveryAuthnCodesBtn").disabled = !event.target.checked;
                        }}
                    />
                    <div>{msg("recovery-codes-confirmation-message")}</div>
                </div>

                <form action={kcContext.url.loginAction} className={kcClsx("kcFormGroupClass")} id="kc-recovery-codes-settings-form" method="post">
                    <input type="hidden" name="generatedRecoveryAuthnCodes" value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString} />
                    <input type="hidden" name="generatedAt" value={recoveryAuthnCodesConfigBean.generatedAt} />
                    <input type="hidden" id="userLabel" name="userLabel" value={msgStr("recovery-codes-label-default")} />

                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />

                    {isAppInitiatedAction ? (
                        <div className="flex justify-between w-full space-x-2">
                            <input
                                type="submit"
                                className={cn(buttonVariants(), "w-full")}
                                id="saveRecoveryAuthnCodesBtn"
                                value={msgStr("recovery-codes-action-complete")}
                                disabled
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                variant={"outline"}
                                id="cancelRecoveryAuthnCodesBtn"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("recovery-codes-action-cancel")}
                            </Button>
                        </div>
                    ) : (
                        <input
                            type="submit"
                            className={cn(buttonVariants(), "w-full")}
                            id="saveRecoveryAuthnCodesBtn"
                            value={msgStr("recovery-codes-action-complete")}
                            disabled
                        />
                    )}
                </form>
            </div>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <div className="checkbox">
                    <div className="flex items-center flex-row">
                        <input
                            type="checkbox"
                            id="logout-sessions"
                            name="logout-sessions"
                            value="on"
                            defaultChecked={true}
                            className={cn(checkboxVariants({}), "!py-0")}
                        />
                        <span className="mx-2">{msg("logoutOtherSessions")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
