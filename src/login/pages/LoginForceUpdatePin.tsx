import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PasswordWrapper } from "../../components/ui/password-wrapper";
import { Input } from "../../components/ui/input";
import { buttonVariants, Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { checkboxVariants } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

export default function LoginForceUpdatePin(
  props: PageProps<Extract<KcContext, { pageId: "login-force-update-pin.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
  const { msg, msgStr } = i18n;
  const { url, messagesPerField, isAppInitiatedAction } = kcContext;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("pin", "pin-confirm")}
      headerNode="Update Pin"
    >
      <form id="kc-force-update-pin-form" action={url.loginAction} method="post" className="flex flex-col">
        {/* Old Pin Field */}
        <div className={kcClsx("kcFormGroupClass")}>
          <div>
            <Label htmlFor="pin-old" className="text-lg">
              Old Pin
            </Label>
          </div>

          <div>
            <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="pin-old">
              <Input
                type="password"
                id="pin-old"
                name="pin-old"
                autoFocus
                autoComplete="current-password"
                inputMode="numeric" // optional: show numeric keyboard on mobile
                pattern="\d*"
                aria-invalid={messagesPerField.existsError("pin-old")}
              />
            </PasswordWrapper>
            {messagesPerField.existsError("pin-old") && (
              <span
                id="input-error-pin-old"
                className={kcClsx("kcInputErrorMessageClass")}
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("pin-old"))
                }}
              />
            )}
          </div>
        </div>
        
        {/* New PIN Field */}
        <div className={kcClsx("kcFormGroupClass")}>
          <div>
            <Label htmlFor="pin-new" className="text-lg">
              New Pin
            </Label>
          </div>
          <div>
            <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="pin-new">
              <Input
                type="password"
                id="pin-new"
                name="pin-new"
                autoComplete="new-password"
                inputMode="numeric" // optional: show numeric keyboard on mobile
                pattern="\d*"                
                aria-invalid={messagesPerField.existsError("pin")}
              />
            </PasswordWrapper>
            {messagesPerField.existsError("pin") && (
              <span
                id="input-error-pin"
                className={kcClsx("kcInputErrorMessageClass")}
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("pin"))
                }}
              />
            )}
          </div>
        </div>


        {/* Confirm Pin Field */}
        <div className={kcClsx("kcFormGroupClass")}>
          <div>
            <Label htmlFor="pin-confirm" className="text-lg">
              Confirm Pin
            </Label>
          </div>
          <div>
            <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="pin-confirm">
              <Input
                type="password"
                id="pin-confirm"
                name="pin-confirm"
                autoComplete="new-password"
                inputMode="numeric" // optional: show numeric keyboard on mobile
                pattern="\d*" 
                aria-invalid={messagesPerField.existsError("pin", "pin-confirm")}
              />
            </PasswordWrapper>
            {messagesPerField.existsError("pin-confirm") && (
              <span
                id="input-error-pin-confirm"
                className={kcClsx("kcInputErrorMessageClass")}
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("pin-confirm"))
                }}
              />
            )}
          </div>
        </div>

        {/* Logout Other Sessions */}
        <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />

        {/* Submit and Cancel Buttons */}
        <div className="responsive-container">
          <input
            className={cn(buttonVariants(), "w-full my-5")}
            type="submit"
            value={msgStr("doSubmit")}
          />
          {isAppInitiatedAction && (
            <Button
              className="w-full"
              type="submit"
              name="cancel-aia"
              value="true"
              variant="outline"
            >
              {msg("doCancel")}
            </Button>
          )}
        </div>
      </form>
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
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="logout-sessions"
              name="logout-sessions"
              value="on"
              //defaultChecked
              disabled
              aria-disabled="true"
              className={cn(checkboxVariants({}))}
            />
            <span>{msg("logoutOtherSessions")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
