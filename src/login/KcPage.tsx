import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Template as CustomTemplate } from "./Template";

import "../styles/global.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login";
import LoginUsername from "./pages/LoginUsername";
import LoginForceUpdatePassword from "./pages/LoginForceUpdatePassword";
import LoginForceUpdatePin from "./pages/LoginForceUpdatePin";
import LoginManualUpdatePassword from "./pages/LoginManualUpdatePassword";
import LoginManualUpdatePin from "./pages/LoginManualUpdatePin";
import ForgetPassword from "./pages/ForgetPassword";
import ForgetPin from "./pages/ForgetPin";
import Info from "./pages/Info";
import Register from "./pages/Register";
import Code from "./pages/Code";
import Error from "./pages/Error";
import LoginPassword from "./pages/LoginPassword";
import WebauthnAuthenticate from "./pages/WebauthnAuthenticate";
import WebauthnRegister from "./pages/WebauthnRegister";
import WebauthnError from "./pages/WebauthnError";
import LoginOauth2DeviceVerifyUserCode from "./pages/LoginOauth2DeviceVerifyUserCode";
import LoginOauthGrant from "./pages/LoginOauthGrant";
import LoginResetPassword from "./pages/LoginResetPassword";
import Terms from "./pages/Terms";
import LoginVerifyEmail from "./pages/LoginVerifyEmail";
import LoginIdpLinkConfirm from "./pages/LoginIdpLinkConfirm";
import LoginIdpLinkEmail from "./pages/LoginIdpLinkEmail";
import LoginOtp from "./pages/LoginOtp";
import LoginPageExpired from "./pages/LoginPageExpired";
import LoginRecoveryAuthnCodeConfig from "./pages/LoginRecoveryAuthnCodeConfig";
import LoginRecoveryAuthnCodeInput from "./pages/LoginRecoveryAuthnCodeInput";
import LoginResetOtp from "./pages/LoginResetOtp";
import LoginUpdatePassword from "./pages/LoginUpdatePassword";
import LoginUpdateProfile from "./pages/LoginUpdateProfile";
import LoginX509Info from "./pages/LoginX509Info";
import LogoutConfirm from "./pages/LogoutConfirm";
import SamlPostForm from "./pages/SamlPostForm";
import SelectAuthenticator from "./pages/SelectAuthenticator";
import UpdateEmail from "./pages/UpdateEmail";
import DeleteAccountConfirm from "./pages/DeleteAccountConfirm";
import DeleteCredential from "./pages/DeleteCredential";
import LinkIdpAction from "./pages/LinkIdpAction"
import LoginConfigTotp from "./pages/LoginConfigTotp";
import LoginIdpLinkConfirmOverride from "./pages/LoginIdpLinkConfirmOverride";
import SelectOrganization from "./pages/SelectOrganization";

const UserProfileFormFields = lazy(
    () => import("./UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

const theme_dark = createTheme({
    palette: { mode: "dark" }
});
const theme_light = createTheme({
    palette: { mode: "light" }
});

export function useDarkMode() {
    const [isDark] = useState(
        window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
    );

    useEffect(() => {
        const stored = sessionStorage.getItem("isDark");
        const isDark = stored ? stored === "true" : window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    return isDark;
}

const Base = ({ kcContext, i18n, classes }: { kcContext: KcContext; i18n: any; classes: any }) => {
    switch (kcContext.pageId) {
        case "login-force-update-password.ftl": {
            const ctx = kcContext as Extract<KcContext, { pageId: "login-force-update-password.ftl" }>;
            return (
                <LoginForceUpdatePassword 
                    kcContext={ctx}
                    i18n={i18n}
                    classes={classes}
                    Template={CustomTemplate}
                    doUseDefaultCss={true}
                />
            );
        }

        case "login-force-update-pin.ftl": {
            const ctx = kcContext as Extract<KcContext, { pageId: "login-force-update-pin.ftl" }>;
            return (
                <LoginForceUpdatePin
                    kcContext={ctx}
                    i18n={i18n}
                    classes={classes}
                    Template={CustomTemplate}
                    doUseDefaultCss={true}
                />
            );
        }

        case "login-manual-update-password.ftl": {
            const ctx = kcContext as Extract<KcContext, { pageId: "login-manual-update-password.ftl" }>;
            return (
                <LoginManualUpdatePassword
                    kcContext={ctx}
                    i18n={i18n}
                    classes={classes}
                    Template={CustomTemplate}
                    doUseDefaultCss={true}
                />
            );
        }

        case "login-manual-update-pin.ftl": {
            const ctx = kcContext as Extract<KcContext, { pageId: "login-manual-update-pin.ftl" }>;
            return (
                <LoginManualUpdatePin
                    kcContext={ctx}
                    i18n={i18n}
                    classes={classes}
                    Template={CustomTemplate}
                    doUseDefaultCss={true}
                />
            );
        }

        case "forget-password.ftl": {
            const ctx = kcContext as Extract<KcContext, { pageId: "forget-password.ftl" }>;
            return (
                <ForgetPassword
                    kcContext={ctx}
                    i18n={i18n}
                    classes={classes}
                    Template={CustomTemplate}
                    doUseDefaultCss={true}
                />
            );
        }

        case "forget-pin.ftl": {
            const ctx = kcContext as Extract<KcContext, { pageId: "forget-pin.ftl" }>;
            return (
                <ForgetPin
                    kcContext={ctx}
                    i18n={i18n}
                    classes={classes}
                    Template={CustomTemplate}
                    doUseDefaultCss={true}
                />
            );
        }        

        default:
            return (
                <DefaultPage
                    kcContext={kcContext as any}
                    i18n={i18n}
                    classes={classes}
                    Template={CustomTemplate}
                    doUseDefaultCss={true}
                    UserProfileFormFields={UserProfileFormFields}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
            );
    }
};

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props as { kcContext: KcContext };
    const { i18n } = useI18n({ kcContext });
    const isDark = useDarkMode();

    useEffect(() => {
        try {
            // eslint-disable-next-line no-console
            console.debug("[KcPage] mount", { pageId: kcContext?.pageId });
        } catch (e) {
            // ignore
        }

        return () => {
            try {
                // eslint-disable-next-line no-console
                console.debug("[KcPage] unmount", { pageId: kcContext?.pageId });
            } catch (e) {
                // ignore
            }
        };
    }, [kcContext?.pageId]);

    try {
        return (
            <ThemeProvider theme={isDark ? theme_dark : theme_light}>
                <Suspense>
                    {(() => {
                        switch (kcContext.pageId) {
                            case "code.ftl":
                                return (
                                    <Code
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "delete-account-confirm.ftl":
                                return (
                                    <DeleteAccountConfirm
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "delete-credential.ftl":
                                return (
                                    <DeleteCredential
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "error.ftl":
                                return (
                                    <Error
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "info.ftl":
                                return (
                                    <Info
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "link-idp-action.ftl":
                                return (
                                    <LinkIdpAction
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );                                          
                            case "login.ftl":
                                return (
                                    <Login
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-config-totp.ftl":
                                return (
                                    <LoginConfigTotp
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );                                
                            case "login-idp-link-confirm.ftl":
                                return (
                                    <LoginIdpLinkConfirm
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-idp-link-confirm-override.ftl":
                                return (
                                    <LoginIdpLinkConfirmOverride
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );                                
                            case "login-idp-link-email.ftl":
                                return (
                                    <LoginIdpLinkEmail
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-oauth2-device-verify-user-code.ftl":
                                return (
                                    <LoginOauth2DeviceVerifyUserCode
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-oauth-grant.ftl":
                                return (
                                    <LoginOauthGrant
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-otp.ftl":
                                return (
                                    <LoginOtp
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-page-expired.ftl":
                                return (
                                    <LoginPageExpired
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-password.ftl":
                                return (
                                    <LoginPassword
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-recovery-authn-code-config.ftl":
                                return (
                                    <LoginRecoveryAuthnCodeConfig
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-recovery-authn-code-input.ftl":
                                return (
                                    <LoginRecoveryAuthnCodeInput
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-reset-otp.ftl":
                                return (
                                    <LoginResetOtp
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-reset-password.ftl":
                                return (
                                    <LoginResetPassword
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-update-password.ftl":
                                return (
                                    <LoginUpdatePassword
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-update-profile.ftl":
                                return (
                                    <LoginUpdateProfile
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                        UserProfileFormFields={UserProfileFormFields} // Pass the required UserProfileFormFields prop
                                        doMakeUserConfirmPassword={true} // or false, depending on your requirement
                                    />
                                );
                            case "login-username.ftl":
                                return (
                                    <LoginUsername
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-verify-email.ftl":
                                return (
                                    <LoginVerifyEmail
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "login-x509-info.ftl":
                                return (
                                    <LoginX509Info
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "logout-confirm.ftl":
                                return (
                                    <LogoutConfirm
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "register.ftl":
                                return (
                                    <Register
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                        UserProfileFormFields={UserProfileFormFields}
                                        doMakeUserConfirmPassword={true}
                                    />
                                );
                            case "saml-post-form.ftl":
                                return (
                                    <SamlPostForm
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "select-authenticator.ftl":
                                return (
                                    <SelectAuthenticator
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "select-organization.ftl":
                                return (
                                    <SelectOrganization
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );                                
                            case "terms.ftl":
                                return (
                                    <Terms
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "update-email.ftl":
                                return (
                                    <UpdateEmail
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                        UserProfileFormFields={UserProfileFormFields} // Pass the required UserProfileFormFields prop
                                        doMakeUserConfirmPassword={true} // or false, depending on your requirement
                                    />
                                );
                            case "webauthn-authenticate.ftl":
                                return (
                                    <WebauthnAuthenticate
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "webauthn-error.ftl":
                                return (
                                    <WebauthnError
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );
                            case "webauthn-register.ftl":
                                return (
                                    <WebauthnRegister
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classescustom}
                                        Template={CustomTemplate}
                                        doUseDefaultCss={true}
                                    />
                                );                                                                
                            default:
                                return (
                                    <Base 
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classes}
                                    />
                                );
                        }
                    })()}
                </Suspense>
            </ThemeProvider>
        );
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error("[KcPage] render error", e);

        return (
            <div data-kcpage-error style={{ color: "#7f1d1d", background: "#fee", padding: 12 }}>
                <strong>KcPage render error</strong>
                <pre style={{ whiteSpace: "pre-wrap" }}>{String(e)}</pre>
            </div>
        );
    }
}

const classescustom = {
    kcHtmlClass: "bg-background"
} satisfies { [key in ClassKey]?: string };

const classes = {} satisfies { [key in ClassKey]?: string };
