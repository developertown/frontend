import React, { Suspense } from "react";
import { I18nextProvider } from "react-i18next";

export default function I18nProvider({ children, i18n, locale }: any) {
  React.useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);
  return (
    <Suspense fallback="loading...">
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Suspense>
  );
}
