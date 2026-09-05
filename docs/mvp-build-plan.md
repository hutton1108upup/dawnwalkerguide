# Dawnwalker Guide MVP 建站方案

**Goal:** 完成 dawnwalker-guide.wiki 英文决策攻略站、本地生产预览及审查链接。
**Architecture:** Next.js App Router + TypeScript + Tailwind，结构化内容驱动 SSG 页面；交互工具使用 localStorage。首页视觉唯一基准为 `mockups/home-b-eclipse.html`，其余按设计规范 v2.0。
**Spec:** `Blood of Dawnwalker 攻略站最终版 PRD v4.0.md`、`设计规范 v2.0（方案B定稿·交Codex）.md`、`关键词.md`。

## 约束与决定

- 用户指定域名优先于 PRD 候选域名，canonical 使用 https://dawnwalker-guide.wiki。
- 当前请求交付网站代码与可审查预览；不据文档内的上线操作描述擅自推送、部署、绑定 DNS 或注册分析服务。
- 保留英文、冷蓝黑/羊皮纸双主题、日蚀金、Cormorant Garamond + Inter；不重新设计 Hero，不增加背景图或重动效。
- 首页：Hero → 问题入口 → 可交互 Planner 预览 → Popular Problems → Fixes → Recently Verified。
- 核验时间单位；不得把任务 segments 算成天。未知 cost 保留 null，估计有未知项时不得显示为完整可用余额。
- 证据等级与内容来源绑定：官方公告与第三方实机报道分开，不声称本站实机验证。没有数据的 Boss/Build 不制造攻略，不进入 sitemap。
- 清洗关键词：保留游戏问题，删除其他游戏、CopyCompare/Analyze 和重复词；分别分配到工具、指南、性能、发售信息。
- 采用原生语义控件与轻量可访问组件；无需账号、数据库、AI API 或服务端用户资料。

## 工作分工与文件契约

1. 主线程：基础工程、`app/`、`components/site/`、`components/content/`、全局 CSS、SEO 与验证脚本。
2. 工具 agent：仅 `components/tools/`、`lib/planner.ts`、`tests/planner.test.ts`。读取 `content/types.ts`，通过 props 接收数据。独立验证时间统计、未知值、冲突与持久化。
3. 内容 agent：仅 `content/data.ts`，读取数据契约与研究证据，交付有来源的英文内容。不得编辑 UI 文件。
4. 研究 agent：仅 `docs/research-evidence.md`，核验官方/原始实机材料，向内容 agent 提供证据。

## 执行清单

- [x] 建立 Next.js、字体、token、共享主题/剧透 provider、导航/搜索、Footer。
- [x] 完成首页六区块及首次本地预览。
- [x] 实现 Planner 的筛选、增删、日期、目标、统计、风险、localStorage；未知成本独立计数。
- [x] 实现 Missable Checklist、本地勾选进度、三档 Choices。
- [x] 发布有依据的 P0 time-limit、quest-order、missable-quests、choices、beginner 和 fix 内容；具体任务/选择有证据才发布。
- [x] 实现 Quick Answer、证据状态/版本/日期、正文 TOC、来源和关联工具。
- [x] 完成 sitemap、robots、RSS、canonical、Article/Breadcrumb/WebApplication Schema、404、About/Policy/Contact/Privacy；GA/GSC只保留可配置接入点，无凭证不声明接入。
- [x] 验证：关键计算单测、TypeScript、production build；桌面/390px移动端两主题、导航、搜索、剧透、工具保存恢复、无横向溢出/控制台错误/死链。
- [x] 写交付报告与页面链接、启动持久生产预览，按验证结果更新 Goal。

## 验收边界

功能可用与游戏数据库完整度分别报告。发布链接、真实域名可用性与本地可审查链接分别报告。未知资料不会为完成页面数量目标而捏造。
