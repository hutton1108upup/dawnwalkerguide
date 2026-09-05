# Git 提交文件范围

本次为项目首次提交，目标仓库为 `hutton1108upup/dawnwalkerguide`。原始需求资料和本地审查产物均保留在磁盘上；排除只影响 Git 跟踪。

## 纳入仓库

- `app/`、`components/`、`content/`、`lib/`：页面、交互、游戏资料和元数据实现。
- `public/fonts/`：分享图生成依赖的字体及 OFL 许可证，属于运行所需素材。
- `package.json`、`package-lock.json`、`next.config.ts`、`tsconfig.json`、`postcss.config.mjs`：依赖锁定与构建配置。
- `tests/`、`scripts/browser-qa.mjs`：可重复执行的计算、内容与浏览器检查。
- `README.md`、`docs/mvp-build-plan.md`、`docs/research-evidence.md`、`docs/asset-sources.md`：维护说明、实施依据和来源记录。
- PRD、设计规范、关键词、同行参考和 `mockups/home-b-eclipse.html`：项目后续维护需要的产品与视觉基准，不会作为公开网站路由输出。

## 仅保留本地

| 路径 | 原因 |
|---|---|
| `node_modules/` | 通过锁文件安装，不提交依赖副本 |
| `.next/`、`out/`、`*.tsbuildinfo` | 可再生构建结果和增量缓存 |
| `next-env.d.ts` | Next.js 自动生成，可能引用本机开发构建类型 |
| `artifacts/` | 截图、QA输出、进程PID、预览日志与失败诊断 |
| `.workbuddy/` | 本地工具记忆，非项目运行或维护必需资料 |
| 根目录 `AGENTS.md`、`CLAUDE.md` | 当前内容仅为框架自动生成提示，不含项目自定义规则 |
| `docs/mvp-delivery.md` | 本地验收快照，引用本地预览与不提交的截图 |
| `scripts/write-delivery.ts` | 一次性任务交付生成器，依赖本地验收输出 |
| `.env*`、密钥文件 | 本地配置与凭据，禁止随源码上传；可提交经过脱敏的 `.env.example` |

浏览器测试仍保留。以后运行 `npm.cmd run qa` 会重新生成本机 `artifacts/`，不需要把这些产物放进 Git。若以后在 AGENTS 中编写项目规则，应重新评估并取消该文件的根目录忽略项。
