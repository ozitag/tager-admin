import { TFunction } from 'i18next';
import { LinkType } from '@tager/admin-ui';
import { getPageListUrl } from '@tager/admin-pages';
import { getEmailLogListUrl, getEmailTemplateListUrl } from '@tager/admin-mail';
import { getSettingItemListUrl } from '@tager/admin-settings';
import { getSeoSettingsUrl, getSeoTemplatesUrl } from '@tager/admin-seo';
import { getAdminListUrl, getRoleListUrl } from '@tager/admin-administrators';

type LinkKey =
  | 'HOME'
  | 'PAGE_LIST'
  | 'EMAIL_TEMPLATE_LIST'
  | 'EMAIL_LOG_LIST'
  | 'SETTINGS_COMMON'
  | 'SEO_SETTINGS'
  | 'ADMIN_ROLES'
  | 'ADMIN_ADMINS'
  | 'SEO_TEMPLATES';

export const getLinks = (
  t: TFunction
): Readonly<Record<LinkKey, LinkType>> => ({
  HOME: {
    url: '/',
    text: t('admin:home'),
  },
  PAGE_LIST: {
    url: getPageListUrl(),
    text: t('admin:pages'),
  },
  EMAIL_TEMPLATE_LIST: {
    url: getEmailTemplateListUrl(),
    text: t('admin:templates'),
  },
  EMAIL_LOG_LIST: {
    url: getEmailLogListUrl(),
    text: t('admin:logs'),
  },
  SETTINGS_COMMON: {
    url: getSettingItemListUrl(),
    text: t('admin:common'),
  },
  SEO_SETTINGS: {
    url: getSeoSettingsUrl(),
    text: t('admin:seoServices'),
  },
  SEO_TEMPLATES: {
    url: getSeoTemplatesUrl(),
    text: t('admin:seoTemplates'),
  },
  ADMIN_ROLES: {
    url: getRoleListUrl(),
    text: t('admin:roles'),
  },
  ADMIN_ADMINS: {
    url: getAdminListUrl(),
    text: t('admin:administrators'),
  },
});
