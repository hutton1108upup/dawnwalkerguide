# 内页配图方案与来源记录

执行日期：2026-09-06。范围：4 个已有攻略内页新增 6 张官方图片，保留既有首页 SEO 修改；不发布、不推送。

## 图片与关键词

| 内页 / 段落 | 主打关键词或相关意图 | 图片 | 关联理由 |
| --- | --- | --- | --- |
| /guides/time-limit/#what-spends-time | blood of dawnwalker time limit | dawnwalker-time-limit-daytime-hud.webp | 白天 HUD 展示阶段与家庭期限，不宣称是任务成本提示 |
| /guides/time-limit/#segments | day and night segments | dawnwalker-day-night-moonrise-hud.webp | 夜间 HUD 对应昼夜阶段解释，不以旧截图证明正式版数值 |
| /guides/beginner/#forms | blood of dawnwalker beginner guide | dawnwalker-beginner-daytime-exploration.webp | 白天大教堂广场探索，与昼夜可用路线说明对应 |
| /guides/combat/#controls | blood of dawnwalker combat | dawnwalker-combat-sword-encounter.webp | 近身持剑遭遇，不冒充设置界面 |
| /guides/combat/#builds | combat / equipment | dawnwalker-combat-weapon-inventory.webp | 装备检查界面，明确不是最佳武器结论或当前数值 |
| /guides/release-date/#released | the blood of dawnwalker release date | dawnwalker-release-launch-trailer.webp | 官方发布公告使用的 Launch Trailer 宣传图 |

## 来源核查

- 前 5 张：[Bandai Namco 官方 Gameplay Reveal Recap](https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-gameplay-reveal-recap)，2025-06-23。保留画面内 pre-beta 水印及原始比例，逐张检查实际画面后使用。
- 发布图：[Bandai Namco 官方发布公告](https://en.bandainamcoent.eu/dawnwalker/news/the-blood-of-dawnwalker-now-available-pc-playstation-5-and-xbox-series-xs)，2026-09-03。宣传图与游戏截图在图注中明确区分。
- 原始 CDN 地址、目标段落、关键词及关联理由逐项记录于 `content/article-images.ts` 的代码注释；图注直接链接发布者页面。
- 检索了 [Reddit Gameplay Overview 讨论](https://www.reddit.com/r/DawnwalkerOfficial/comments/1lh4pah/the_blood_of_dawnwalker_gameplay_overview/) 和 [Steam 截图区](https://steamcommunity.com/app/3751260/screenshots/)。未取得适合本站具体任务且出处/复用条件明确的论坛原图；未转载玩家原创作品，未向论坛发帖或联系作者。
- Tavily CLI 缺少 API key，改用现有网页搜索及官方页面读取完成检索。
- 已核对[官方社区指南](https://dawnwalkergame.com/us/en/community)。沿用现有非官方标识与来源署名。既有域名与指南要求的冲突已记在 `docs/seo-evidence.md`；本地配图不代表获得额外授权或完成该问题的发布处理。

## 实现与边界

- 本地 WebP，1280 × 720，保持原比例，不裁掉版权或预览标记。
- 使用现有 figure/img/figcaption；width、height、loading=lazy、decoding=async 保留。
- 代码注释用于维护追溯；关键词关联由真实画面、alt、图注及段落上下文表达，不把注释当作排名信号。
- 两张 HUD 图含任务名称，默认不显示，通过现有 light spoiler 控件展开；不为图片收录破坏防剧透。
- 不为任务顺序、药剂、旗帜、Ocha、恋爱或性能排查页错配通用图。缺少相关证据的页面继续保持原图策略和索引状态。
- 仅视觉补充，不刷新正文的 Sources reviewed 日期，不声称重新验证全部游戏事实。

## 验收

构建与内容测试；所有新增图片可解码、尺寸与声明相符；本地页面 HTTP 与图片 MIME 检查；桌面/手机无横向溢出；图注来源可见；默认隐藏 HUD 图片、切换后加载；控制台无错误。
