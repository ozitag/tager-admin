import { LinkType } from "@tager/admin-ui";
// import { getPageListUrl } from "@tager/admin-pages";
// import { getEmailLogListUrl, getEmailTemplateListUrl } from "@tager/admin-mail";
// import { getSettingItemListUrl } from "@tager/admin-settings";
// import { getSeoSettingsUrl, getSeoTemplatesUrl } from "@tager/admin-seo";
// import { getAdminListUrl, getRoleListUrl } from "@tager/admin-administrators";
import { I18nContext } from "@tager/admin-services";

type LinkKey = "HOME";
// | "PAGE_LIST"
// | "EMAIL_TEMPLATE_LIST"
// | "EMAIL_LOG_LIST"
// | "SETTINGS_COMMON"
// | "SEO_SETTINGS"
// | "ADMIN_ROLES"
// | "ADMIN_ADMINS"
// | "SEO_TEMPLATES";

export const getLinks = (
  i18n: I18nContext
): Readonly<Record<LinkKey, LinkType>> => ({
  HOME: {
    url: "/",
    text: i18n.t("admin:home"),
  },
  // PAGE_LIST: {
  //   url: getPageListUrl(),
  //   text: i18n.t("admin:pages"),
  // },
  // EMAIL_TEMPLATE_LIST: {
  //   url: getEmailTemplateListUrl(),
  //   text: i18n.t("admin:templates"),
  // },
  // EMAIL_LOG_LIST: {
  //   url: getEmailLogListUrl(),
  //   text: i18n.t("admin:logs"),
  // },
  // SETTINGS_COMMON: {
  //   url: getSettingItemListUrl(),
  //   text: i18n.t("admin:common"),
  // },
  // SEO_SETTINGS: {
  //   url: getSeoSettingsUrl(),
  //   text: i18n.t("admin:seoServices"),
  // },
  // SEO_TEMPLATES: {
  //   url: getSeoTemplatesUrl(),
  //   text: i18n.t("admin:seoTemplates"),
  // },
  // ADMIN_ROLES: {
  //   url: getRoleListUrl(),
  //   text: i18n.t("admin:roles"),
  // },
  // ADMIN_ADMINS: {
  //   url: getAdminListUrl(),
  //   text: i18n.t("admin:administrators"),
  // },
});
