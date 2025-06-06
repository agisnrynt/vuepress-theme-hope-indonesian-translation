import { keys } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { RouteLink, useSiteLocaleData, withBase } from "vuepress/client";

import { useNavigate, useThemeLocaleData } from "@theme-hope/composables/index";
import SocialMedias from "@theme-hope/modules/blog/components/SocialMedias";
import {
  useArticles,
  useBlogLocaleData,
  useBlogOptions,
  useCategoryMap,
  useTagMap,
  useTimeline,
} from "@theme-hope/modules/blog/composables/index";

import { getAuthor } from "../../../../shared/index.js";

import "../styles/blogger-info.scss";

export default defineComponent({
  name: "BloggerInfo",

  setup() {
    const blogLocale = useBlogLocaleData();
    const blogOptions = useBlogOptions();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap = useCategoryMap();
    const tagMap = useTagMap();
    const timelines = useTimeline();
    const navigate = useNavigate();

    const bloggerName = computed(
      () =>
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        blogOptions.value.name ??
        getAuthor(themeLocale.value.author)[0]?.name ??
        siteLocale.value.title,
    );

    const bloggerAvatar = computed(
      () => blogOptions.value.avatar ?? themeLocale.value.logo,
    );

    const intro = computed(() => blogOptions.value.intro);

    return (): VNode => {
      const { article, category, tag, timeline } = blogLocale.value;
      const countItems: [string, number, string][] = [
        [articles.value.path, articles.value.items.length, article],
        [categoryMap.value.path, keys(categoryMap.value.map).length, category],
        [tagMap.value.path, keys(tagMap.value.map).length, tag],
        [timelines.value.path, timelines.value.items.length, timeline],
      ];

      return h(
        "div",
        {
          class: "vp-blogger-info",
          vocab: "https://schema.org/",
          typeof: "Person",
        },
        [
          h(
            "div",
            {
              class: "vp-blogger",
              ...(intro.value
                ? {
                    "aria-label": blogLocale.value.intro,
                    "data-balloon-pos": "down",
                    role: "link",
                    onClick: (): void => {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      navigate(intro.value!);
                    },
                  }
                : {}),
            },
            [
              bloggerAvatar.value
                ? h("img", {
                    class: "vp-blogger-avatar",
                    src: withBase(bloggerAvatar.value),
                    property: "image",
                    alt: "Blogger Avatar",
                    loading: "lazy",
                  })
                : null,
              bloggerName.value
                ? h(
                    "div",
                    { class: "vp-blogger-name", property: "name" },
                    bloggerName.value,
                  )
                : null,
              blogOptions.value.description
                ? h("div", {
                    class: "vp-blogger-description",
                    innerHTML: blogOptions.value.description,
                  })
                : null,
              intro.value
                ? h("meta", { property: "url", content: withBase(intro.value) })
                : null,
            ],
          ),
          h(
            "div",
            { class: "vp-blog-counts" },
            countItems.map(([path, count, locale]) =>
              h(RouteLink, { class: "vp-blog-count", to: path }, () => [
                h("div", { class: "count" }, count),
                h("div", locale),
              ]),
            ),
          ),
          h(SocialMedias),
        ],
      );
    };
  },
});
