---
title: 侧边栏
icon: fas fa-window-maximize fa-rotate-270
order: 2
category:
  - 布局
tag:
  - 布局
  - 侧边栏
---

侧边栏包含相关的文档列表，文档标题以及博客模式下的博主信息。

<!-- markdownlint-disable MD051 -->

主题允许你通过 [文件结构](#通过文件结构自动生成) 和 [文档标题](#通过标题自动生成) 自动生成侧边栏，也可以手动配置。

<!-- markdownlint-enable MD051 -->

<!-- more -->

## 侧边栏链接

站点侧边栏的配置由主题选项中的 `sidebar` 控制。

### 字符串格式

同导航栏，你可以填入一个包含多个文件链接的数组，作为侧边栏基本的配置:

```ts twoslash {4,6-7} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  sidebar: ["/zh/README.md", "/zh/guide/README.md", "/zh/config/README.md"],

  // 等价于:
  // sidebar: ["/zh/", "/zh/guide/", "/zh/config/"],
});
```

数组的每一项会自动提取对应文件的图标与标题，渲染为一个侧边栏项目。

::: tip

你可以省略 `.md` 扩展名，以 `/` 结尾的路径会被推断为 `/README.md`。

:::

### 对象格式

同导航栏，如果你对页面的图标不满意或者觉得页面标题太长，你可以改为配置一个对象。可用的配置项有:

- `text:` 项目文字
- `link` 项目链接
- `icon`: 项目图标 (可选)
- `activeMatch`: 项目激活匹配 (可选)，支持正则字符串。

```ts twoslash {4-19} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  sidebar: [
    {
      text: "指南",
      link: "/zh/guide/README.md",
      icon: "lightbulb",
    },
    { text: "配置", link: "/zh/config/README.md", icon: "config" },
    {
      text: "常见问题",
      link: "/zh/faq.md",
      icon: "circle-question",
      // 会在 `/zh/faq` 开头的路径激活
      // 所以当你前往 `/zh/faq/xxx.html` 时也会激活
      activeMatch: "^/zh/faq",
    },
  ],
});
```

::: tip activeMatch 的高级用法

`activeMatch` 给予你通过正则表达式控制路径是否激活的能力。

:::

### 分组与嵌套

如果你需要展示嵌套结构的侧边栏，你可以将同类链接整理成菜单分组。

你需要使用 [对象格式](#对象格式) ，并提供额外的 `children` 选项设置链接列表。

和导航栏一样，你可以在侧边栏中使用 `prefix` 来为组内的每个链接添加默认的路径前缀，

侧边栏额外支持设置 `collapsible: true` 来使菜单分组可折叠，并且你可以设置 `expanded: true` 来使可折叠的分组默认展开。

```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  sidebar: [
    {
      // 必填，分组标题
      text: "分组 1",
      // 可选，分组图标
      icon: "tip",
      // 可选，分组链接
      link: "/foo/",
      // 可选，分组路径前缀
      prefix: "/foo/",
      // 可选，默认为 false
      collapsible: true,
      // 可选，表达分可折叠侧边栏组的原始状态，默认为 false
      expanded: true,
      // 必填，分组链接列表
      children: [
        "README.md" /* /foo/index.html */,
        /* ... */
        "geo.md" /* /foo/geo.html */,
      ],
    },
    {
      text: "分组 2",
      children: [
        "bar.md" /* /ray/bar.html */,
        "baz.md" /* /ray/baz.html */,
        // ...
      ],
    },
  ],
});
```

侧边栏分组也可以进行嵌套:

```ts twoslash {11-22} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  sidebar: [
    {
      text: "Group",
      prefix: "/",
      children: [
        "baz" /* /baz.html */,
        {
          text: "Sub Group 1",
          children: ["quz" /* /quz.html */, "xyzzy" /* /xyzzy.html */],
        },
        {
          text: "Sub Group 2",
          prefix: "corge/",
          children: [
            "fred" /* /corge/fred.html */,
            "grault" /* /corge/grault.html */,
          ],
        },
        "foo" /* /foo.html */,
      ],
    },
  ],
});
```

通常情况下，你可能希望搭配 `prefix` 来快速还原文档的结构。

比如，将你的页面文件为下述的目录结构:

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│   ├─ README.md
│   ├─ one.md
│   └─ two.md
└─ bar/
    ├─ README.md
    ├─ three.md
    └─ four.md
```

你就可以进行以下配置:

```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  sidebar: [
    "/" /* / */,
    {
      text: "Foo",
      prefix: "/foo/",
      children: [
        "" /* /foo/ */,
        "one" /* /foo/one.html */,
        "two" /* /foo/two.html */,
      ],
    },
    {
      text: "Bar",
      prefix: "/bar/",
      children: [
        "" /* /bar/ */,
        "three" /* /bar/three.html */,
        "four" /* /bar/four.html */,
      ],
    },
    "/contact" /* /contact.html */,
    "/about" /* /about.html */,
  ],
});
```

### 多个侧边栏

如果你想为不同的页面组来显示不同的侧边栏，你需要通过 `路径前缀: 侧边栏配置` 的格式为侧边栏配置一个对象。

比如，将你的页面文件为下述的目录结构:

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│   ├─ README.md
│   ├─ one.md
│   └─ two.md
└─ bar/
    ├─ README.md
    ├─ three.md
    └─ four.md
```

你就可以遵循以下的侧边栏配置，来为不同路径显示不同的分组:

```ts twoslash title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  sidebar: {
    "/foo/": [
      "" /* /foo/ */,
      "one" /* /foo/one.html */,
      "two" /* /foo/two.html */,
    ],

    "/bar/": [
      "" /* /bar/ */,
      "three" /* /bar/three.html */,
      "four" /* /bar/four.html */,
    ],

    // 回退
    "/": ["" /* / */, "contact" /* /contact.html */, "about" /* /about.html */],
  },
});
```

::: warning

你需要注意对象键声明的顺序。一般来说，你应该将更精确的路径放在前面，因为 VuePress 会遍历侧边栏配置的键名来寻找匹配的配置。一旦成功匹配到当前路径的键名，就会显示对应的侧边栏配置。

在这种情况下，回退侧边栏必须最后定义。

:::

## 通过文件结构自动生成侧边栏 <Badge text="新增" type="tip" />

你可以在上述任意侧边栏配置中，将原来的“侧边栏数组”替换为 `"structure"` 关键词。这会让主题自动读取本地文件，为你生成对应的侧边栏结构，以大大减少你的配置工作量。

比如对于之前在 [多个侧边栏](#多个侧边栏) 提到的如下例子:

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│   ├─ README.md
│   ├─ one.md
│   └─ two.md
└─ bar/
    ├─ README.md
    ├─ three.md
    └─ four.md
```

你可以将原来的配置改为:

```ts twoslash {5,7} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  sidebar: {
    "/foo/": "structure",

    "/bar/": "structure",

    // fallback
    "/": ["" /* / */, "contact" /* /contact.html */, "about" /* /about.html */],
  },
});
```

在上述的修改中，由于原侧边栏数组即为相关路径下的全部文件，你可以轻松将其替换为 `"structure"` 关键词。

如果你使用结构生成的文件夹下嵌套了其他文件夹，则对应的文件夹会被渲染成一个分组。所以你甚至可以更加激进，比如直接设置 `sidebar: "structure"` 让你的侧边栏全部从文件结构中自动生成。

::: warning 限制

由于结构侧边栏取决于文件结构和 Markdown Frontmatter，因此 Markdown 的任何更改都可能更新结构侧边栏。(例如: 如下所述在 Frontmatter 中设置 `index: false`)

但是，对于大型网站，重新计算侧边栏是一个高耗时操作，因此主题只会在 [`hotReload` 启用](../../config/theme/basic.md#hotreload) 的情况下实时更新结构化侧边栏。

:::

### 进阶控制

在从结构自动生成的过程中，你可以通过页面 Frontmatter 中的 `index` 选项控制同一文件夹下的文件是否被包含、并通过 `order` 控制它们的排序方式。

当你不希望页面被侧边栏收录时，你需要在 Frontmatter 中设置 `index: false`。

默认情况下，侧边栏会按照文件名的标题文字按照当前语言排序，你可以通过 `order` 来控制它们的排序方式，当你设置为正数时，它们会出现在分组最前方，越小的越靠前，当你设置为负数时，会出现在分组最后方，越大的越靠后:

- 页面 -> order: 1
- 页面 -> order: 2
- 页面 -> order: 3
- ...
- 含有正数 `order` 的页面在此处会根据 order 大小排序
- ...
- 不含有 `order` 选项的页面 -> 标题: Axxx
- ...
- 不含有 `order` 选项的页面在此处会根据标题排序
- ...
- 不含有 `order` 选项的页面 -> 标题: Zxxx
- ...
- 含有负数 `order` 的页面在此处会根据 order 大小排序
- ...
- 页面 -> order: -3
- 页面 -> order: -2
- 页面 -> order: -1

::: tip

`README.md` 是一个例外，只要你不通过 `index: false` 或使其成为分组链接禁止其出现在侧边栏中，它总会在排序中成为第一项。

:::

对于嵌套文件夹，其分组信息由对应文件夹下的 `README.md` 控制，你可以通过 Frontmatter 中的 `dir` 选项控制文件夹分组的行为，相关可选项目如下:

- `dir.text`: 目录标题，默认为 README.md 标题
- `dir.icon`: 目录图标，默认为 README.md 图标
- `dir.collapsible`: 目录是否可折叠，默认为 `true`
- `dir.expanded`: 目录是否默认展开，默认为 `false`
- `dir.link`: 目录是否可点击，默认为 `false`
- `dir.index`: 是否索引此目录，默认为 `true`
- `dir.order`: 目录在侧边栏中的顺序，默认为 `0`

以下是一个案例：

```md
---
dir:
  order: 1
  text: Group 1
---
```

如果对应文件夹不存在 `README.md` 文件，则只有分组标题会从文件夹名称中生成。

#### 自定义排序

除了上面的实现外，我们还在主题选项中添加了更为强大的 `sidebarSorter` 选项。你可以传入一个或一系列内置排序器名称，也可以传递一个自己需要的排序函数对同级的侧边栏项目进行排序。

可用的关键字有:

- `readme`: `README.md` 或 `readme.md` 在前
- `order`: 正序在前并按其值升序排列，负序在后并按其值降序排列
- `date`: 按日期升序排序
- `date-desc`: 按日期降序排序
- `title`: 按标题字母顺序排序
- `filename`: 按文件名字母顺序排序

对应上述的进阶控制，它的默认值是 `["readme", "order", "title", "filename"]`

## 禁用侧边栏

你可以通过 `Frontmatter 来禁用指定页面的侧边栏:

```md
---
sidebar: false
---
```

::: note

侧边栏在主页中默认禁用。

:::

## 活动的标题链接

默认情况下，当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新。

这个功能是通过插件 `@vuepress/plugin-active-header-links` 实现的，并可以通过以下的配置来禁用:

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    activeHeaderLinks: false,
  },
});
```

## 多语言

主题的侧边栏支持 [多语言](https://vuejs.press/zh/guide/i18n.html)，所以你可以为每个语言单独设置侧边栏:

```ts twoslash {6-8,11-13} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  locales: {
    "/": {
      sidebar: [
        /* 根目录下的英文配置 */
      ],
    },
    "/zh/": {
      sidebar: [
        /* 中文目录下的中文配置 */
      ],
    },
  },
});
```

## 相关助手与类型

`vuepress-theme-hope` 将侧边栏的类型导出为 `SidebarOptions`，同时，提供了一个 `sidebar` 帮助函数。

::: tip

为了应对当你将 [多侧边栏配置](#多个侧边栏) 拆分成多个部分的情景，我们还针对性的提供了 `SidebarArrayConfig` `SidebarObjectConfig` 类型与 `arraySidebar` 和 `objectSidebar` 帮助函数。

:::

```ts twoslash {4} title=".vuepress/sidebar.ts"
import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  /* 你的侧边栏配置 */
]);
```

## 例子

::: details 本文档的侧边栏配置

```ts twoslash title=".vuepress/sidebar/zh.ts"
import { sidebar } from "vuepress-theme-hope";

<!-- @include: ../../../.vuepress/sidebar/zh.ts#config -->
```

:::
