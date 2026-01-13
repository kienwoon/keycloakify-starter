import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/ui/mode-toggle";
import { Card, CardContent } from "../components/ui/card";
import "../styles/global.css";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { PUBLIC_URL } from "keycloakify/PUBLIC_URL";
// PUBLIC_URL is used by the Logo component; no direct import needed here.
//import Logo from "../components/Logo";

export function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    const languageSelector = () => {
        return (
            <div>
                {enabledLanguages.length > 1 && (
                    <div className="-mr-3 justify-end">
                        <div id="kc-locale-wrapper" className="flex items-center justify-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        tabIndex={1}
                                        variant="secondary"
                                        size="sm"
                                        aria-label={msgStr("languages")}
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        aria-controls="language-switch1"
                                        className="px-3 py-0"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <GlobeAltIcon className="h-5 w-5" />
                                            <span>{currentLanguage.label}</span>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent id="language-switch1" role="menu">
                                    {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                        <DropdownMenuItem key={languageTag} role="none">
                                            <a role="menuitem" id={`language-${i + 1}`} href={href}>
                                                {label}
                                            </a>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                )}
            </div>
        );
    };
    return (
        <div className="bg-background  min-h-screen   flex flex-col items-center justify-center  prose dark:prose-invert max-w-none">
            <div id="kc-header-wrapper" className="text-center text-foreground hide md:visible">
                {msgStr("loginTitleHtml", realm.displayNameHtml)}
            </div>
            
            <div className="my-0 mx-auto mb-8">
                <img src={`${PUBLIC_URL}/img/logo.png`} width={128} alt="logo n2n" />
            </div>
            
            <Card className="py-0 px-3  md:-[40rem] shadow-2xl w-full min-h-screen  md:w-[30rem] sm:min-h-fit ">
                <CardContent className="space-y-8 pb-5 ">
                    <div className="flex justify-end space-x-4 pt-2">
                        {languageSelector()}
                        <ModeToggle />
                    </div>
                    <header className="text-center  ">
                        {(() => {
                            const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                <h1 id="kc-page-title">{headerNode}</h1>
                            ) : (
                                <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                    <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                    <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                        <div className="kc-login-tooltip">
                                            <i className={kcClsx("kcResetFlowIcon")}></i>
                                            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            );

                            if (displayRequiredFields) {
                                return (
                                    <div className="text-sm">
                                        <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
                                            <span className="subtitle">
                                                <span className="required">*</span>
                                                {msg("requiredFields")}
                                            </span>
                                        </div>
                                        <div className="col-md-10">{node}</div>
                                    </div>
                                );
                            }

                            return node;
                        })()}
                    </header>
                    <div id="kc-content" className="">
                        <div id="kc-content-wrapper">
                            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <div
                                    className={clsx(
                                        `alert-${message.type}`,
                                        kcClsx("kcAlertClass"),
                                        `pf-m-${message?.type === "error" ? "danger" : message.type}`
                                    )}
                                >
                                    <div className="pf-c-alert__icon">
                                        {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                                        {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                                        {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                                        {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                                    </div>
                                    <span
                                        className="text-sm"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(message.summary)
                                        }}
                                    />
                                </div>
                            )}
                            {children}
                            {auth !== undefined && auth.showTryAnotherWayLink && (
                                <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                    <div className={kcClsx("kcFormGroupClass")}>
                                        <input type="hidden" name="tryAnotherWay" value="on" />
                                        <a
                                            href="#"
                                            id="try-another-way"
                                            onClick={() => {
                                                document.forms["kc-select-try-another-way-form" as never].submit();
                                                return false;
                                            }}
                                        >
                                            {msg("doTryAnotherWay")}
                                        </a>
                                    </div>
                                </form>
                            )}
                            {socialProvidersNode}
                        </div>
                    </div>
                    {displayInfo && (
                        <div className=" w-full">
                            <div className=" text-foreground">{infoNode}</div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
