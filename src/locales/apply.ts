import { i18n } from "@tager/admin-services";

import { RU } from "./ru";
import { EN } from "./en";

export function applyTranslations() {
  i18n.addTranslations("en", "admin", EN);
  i18n.addTranslations("ru", "admin", RU);
}
