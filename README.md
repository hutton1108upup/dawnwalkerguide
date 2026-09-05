# Dawnwalker Guide

英文决策攻略站 MVP，产品域名配置为 `https://dawnwalker-guide.wiki`。

## 本地审查

- 首页：<http://127.0.0.1:3000/>
- 首批页面：`/guides/`、`/fixes/`、`/tools/30-day-planner/`、`/tools/missable-checklist/`、`/tools/choices/`
- 全部本地审查记录：`docs/mvp-delivery.md`（本地交付产物，不纳入 Git）
- 方案：`docs/mvp-build-plan.md`
- 事实与原始来源：`docs/research-evidence.md`

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd start
```

开发预览使用 `npm.cmd run dev`。默认均监听 `127.0.0.1:3000`，先停止同端口的已有预览再启动。终端退出后的持久生产进程 PID 记录在 `artifacts/preview.pid`（若由当前 Codex 任务启动）。

## 实现与数据

- Next.js App Router、TypeScript、Tailwind v4；CSS token 对照方案 B，字体由 next/font 自托管。
- `content/data.ts` 为内容入口，`content/types.ts` 定义字段。新增任务必须保留证据、成本未知值与阶段标记；不得将序章费用混入正式战役。
- `components/tools`：Planner、Checklist、ChoicesExplorer；`lib/planner.ts`：纯计算与排序逻辑。
- `app/[...slug]/page.tsx` 以结构化数据生成指南/任务/选择/工具/支持页。`lib/routes.ts` 集中控制路由与索引策略。
- 所有个人状态保存在浏览器。没有账号、数据库、实际邮件发送、广告或已连接的统计服务。
- `lib/events.ts` 只派发当前浏览器的 `dw-analytics` 事件（包含 PRD 事件名）；未连接 GA 或外部收集服务。部署与隐私设置确定后再接入，不能把本地事件当成已采集指标。
- GA measurement ID、GSC ownership 和公开联系渠道未提供；当前未注册或连接这些外部服务。

## 验证

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
# 另一个终端先运行 npm.cmd start
npm.cmd run qa
```

浏览器测试使用已安装的 Chrome（Playwright channel `chrome`），报告与截图在 `artifacts/`。如果设备没有 Chrome，需要安装 Chrome 或按本机浏览器修改测试配置。

## 发布范围

仓库保存 MVP 网站源码和可复现构建所需文件。GitHub 提交不代表已部署 Cloudflare/Vercel、注册域名或更改 DNS。SSR/SSG 内容、canonical、robots、sitemap、RSS、按页 Schema 和分享图片均已在代码实现。

提交文件取舍见 `docs/repository-files.md`。安装依赖并运行 Next.js 后会重新生成类型声明与框架代理提示；本地截图、日志、工具记忆和交付记录不会上传。

发布前应核对 [官方社区内容准则](https://dawnwalkergame.com/us/en/community) 的域名条款。该页面明确要求社区域名不包含游戏或公司名称；同时存在旧的未发售介绍，条款修订日期未标明。此处记录官方表述而非法律结论，未擅自替换用户指定域名或对外询问。

## Cloudflare Workers 静态部署

目标 Worker：`dawnwalkerguide`，账号 ID 写在 `wrangler.jsonc`，Git 来源为 `hutton1108upup/dawnwalkerguide` 的 `main`。

- 构建命令：`npm run cf:build`
- 部署命令：`npx wrangler deploy`
- 产物目录：`out`；没有服务端账号或数据库运行时。
- 本地预览：`npx wrangler dev --ip 127.0.0.1 --port 4173 --local`
- 全站检查：设置 `QA_BASE_URL=http://127.0.0.1:4173` 后运行 `npm run qa`；媒体检查运行 `node scripts/media-qa.mjs`。
- `/release.json` 返回构建时 Git SHA，用于核对线上版本。

`npm run build` 仍保留普通 Next.js 生产构建。Cloudflare 构建单独启用静态导出，为 extensionless 首页分享图补 MIME，并兼容当前 Next 16.3 在 Windows 上导出的 RSC 分段文件名。详情分享图使用 `.png` 后缀，避免分类图与分类目录冲突。

官方媒体、关键事实与关键词归属见 `docs/seo-evidence.md`。YouTube 在用户明确点击加载后才连接第三方，播放受网络及 YouTube 嵌入策略影响，始终提供原视频链接。
