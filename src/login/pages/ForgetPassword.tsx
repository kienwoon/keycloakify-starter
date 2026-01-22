import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "../../components/ui/input";
import { buttonVariants, Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Label } from "../../components/ui/label";
import { kcSanitize } from "keycloakify/lib/kcSanitize";


export default function ForgetPassword(
  props: PageProps<Extract<KcContext, { pageId: "forget-password.ftl" }>, I18n>
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
      headerNode="Forget Password"
    >
      <form id="kc-forget-password-form" action={url.loginAction} method="post" className="flex flex-col">
        {/* Username Field */}
        <div className={kcClsx("kcFormGroupClass")}>
          <div>
            <Label htmlFor="username" className="text-lg">
              {msg("username")}
            </Label>
          </div>
          <div>
            <Input
              type="text"
              id="username"
              className=""
              name="username"
              autoFocus
              autoComplete="off"
              required
              aria-required="true"
              aria-invalid={messagesPerField.existsError("username")}
            />
            {messagesPerField.existsError("username") && (
              <span
                id="input-error-username"
                className={kcClsx("kcInputErrorMessageClass")}
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("username"))
                }}
              />
            )}
          </div>
        </div>
        {/* Hint Field */}
        <div className={kcClsx("kcFormGroupClass")}>
          <div>
            <Label htmlFor="hint" className="text-lg">
              Hint
            </Label>
          </div>
          <div>
            <Input
              type="text"
              id="hint"
              className=""
              name="hint"
              autoComplete="off"
              required
              aria-required="true"
              aria-invalid={messagesPerField.existsError("hint")}
            />
            {messagesPerField.existsError("hint") && (
              <span
                id="input-error-hint"
                className={kcClsx("kcInputErrorMessageClass")}
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("hint"))
                }}
              />
            )}
          </div>
        </div>

        {/* Hint Answer Field */}
        <div className={kcClsx("kcFormGroupClass")}>
          <div>
            <Label htmlFor="hint-answer" className="text-lg">
              Hint Answer
            </Label>
          </div>
          <div>
            <Input
              type="text"
              id="hint-answer"
              name="hint-answer"
              autoComplete="off"
              required
              aria-required="true"
              aria-invalid={messagesPerField.existsError("hint-answer")}
            />
            {messagesPerField.existsError("hint-answer") && (
              <span
                id="input-error-hint-answer"
                className={kcClsx("kcInputErrorMessageClass")}
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("hint-answer"))
                }}
              />
            )}
          </div>
        </div>
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
