export const PLUGIN_CHECKLIST: [
  name: string,
  options: string | string[],
  hint?: string,
][] = [
  ["@vuepress/plugin-active-header-links", "plugins.activeHeaderLinks"],
  ["@vuepress/plugin-blog", "plugins.blog"],
  ["@vuepress/plugin-catalog", "plugins.catalog"],
  ["@vuepress/plugin-comment", "plugins.comment"],
  ["@vuepress/plugin-copy-code", "plugins.copyCode"],
  ["@vuepress/plugin-copyright", "plugins.copyright"],
  ["@vuepress/plugin-docsearch", "plugins.docsearch"],
  ["@vuepress/plugin-feed", "plugins.feed"],
  ["@vuepress/plugin-git", "plugins.git"],
  ["@vuepress/plugin-icon", "plugins.icon"],
  ["@vuepress/plugin-links-check", "markdown.linksCheck"],
  ["@vuepress/plugin-markdown-hint", ["markdown.alert", "markdown.hint"]],
  [
    "@vuepress/plugin-markdown-image",
    [
      "markdown.figure",
      "markdown.imgLazyload",
      "markdown.imgMark",
      "markdown.imgSize",
      "markdown.obsidianImgSize",
    ],
  ],
  ["@vuepress/plugin-markdown-math", "markdown.math"],
  ["@vuepress/plugin-markdown-tab", ["markdown.tabs", "markdown.codeTabs"]],
  ["@vuepress/plugin-notice", "plugins.notice"],
  ["@vuepress/plugin-nprogress", "plugins.nprogress"],
  ["@vuepress/plugin-photo-swipe", "plugins.photoSwipe"],
  [
    "@vuepress/plugin-prismjs",
    'markdown.highlighter: { type: "prismjs", ... your options }',
  ],
  ["@vuepress/plugin-pwa", "plugins.pwa"],
  ["@vuepress/plugin-reading-time", "plugins.readingTime"],
  ["@vuepress/plugin-redirect", "plugins.redirect"],
  ["@vuepress/plugin-revealjs", "markdown.revealjs"],
  ["@vuepress/plugin-rtl", "", 'Set "rtl: true" in the needed theme locales.'],
  ["@vuepress/plugin-search", "plugins.search"],
  ["@vuepress/plugin-seo", "plugins.seo"],
  [
    "@vuepress/plugin-shiki",
    'markdown.highlighter: { type: "shiki", ... your options }',
  ],
  ["@vuepress/plugin-slimsearch", "plugins.slimsearch"],
  ["@vuepress/plugin-sitemap", "plugins.sitemap"],
  ["@vuepress/plugin-theme-data", "", "This plugin is called internally."],
  ["@vuepress/plugin-watermark", "plugins.watermark"],
  ["vuepress-plugin-components", "plugins.components"],
  ["vuepress-plugin-md-enhance", "plugins.mdEnhance"],
];
