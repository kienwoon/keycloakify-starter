/* eslint-disable @typescript-eslint/ban-types */
import type { ExtendKcContext } from "keycloakify/login";
import type { KcEnvName, ThemeName } from "../kc.gen";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
    // NOTE: Here you can declare more properties to extend the KcContext
    // See: https://docs.keycloakify.dev/faq-and-help/some-values-you-need-are-missing-from-in-kccontext
};

export type KcContextExtensionPerPage = {
    "login-force-update-password.ftl": {};
    "login-force-update-pin.ftl": {};
    "login-manual-update-password.ftl": {};
    "login-manual-update-pin.ftl": {};
    "forget-password.ftl": {};
    "forget-pin.ftl": {};
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
