# Blood of Dawnwalker 攻略站最终版 PRD v4.0

**项目类型：** 英文游戏攻略站 + 游戏决策工具  
**核心市场：** Google SEO + Reddit / Steam / YouTube 社区  
**核心游戏：** The Blood of Dawnwalker  
**开发原则：** 单站、MVP、真实需求优先、工具差异化、数据可验证  
**推荐技术栈：** Next.js + TypeScript + Tailwind + MDX/JSON + Vercel/Cloudflare  
**项目阶段：** 首发流量窗口期快速验证

---

# 1. 项目最终定位

## 1.1 不做什么

这个项目**不是传统 Wiki**。

不以：

- Characters
- Weapons
- Bosses
- Lore
- Map
- Builds

这些分类数量作为核心竞争力。

也不做：

> “别人有 100 个页面，我快速 AI 生成 150 个页面。”

因为 Fextralife、Game8、PowerPyx、PC Gamer 和已经提前布局的独立站在普通攻略内容上拥有天然优势。

---

## 1.2 我们真正做什么

最终定位：

> **The Blood of Dawnwalker decision-first guide：帮助玩家在有限时间机制下决定“下一步应该做什么”。**

核心价值：

### Plan

30 天有限时间里：

- 先做哪些 Quest；
- 哪些可以以后做；
- 哪些任务值得消耗时间。

### Avoid

提前发现：

- Missable Quest；
- Permanent Lockout；
- 限时 NPC；
- 错过就无法获得的奖励。

### Decide

面对重要 Choice 时：

- 哪个选择更适合自己的目标；
- 会影响什么；
- 但默认不剧透完整剧情。

### Fix

首发阶段快速解决：

- Stuttering；
- Crashing；
- FPS；
- Settings；
- Steam Deck / PS5 Performance。

---

# 2. 一句话产品价值

英文：

> **Plan your 30 days, avoid missable content, and reveal only the spoilers you need.**

更偏 SEO 的描述：

> **The Blood of Dawnwalker guide and 30-day planner for quest order, missable content, choices, builds, bosses, endings and performance fixes.**

---

# 3. 核心竞争策略

整个站采用：

# 「工具 + 搜索内容」双引擎

---

## 引擎 A：工具获得差异化、回访和社区传播

P0：

```text
30-Day Planner
Missable Checklist
Spoiler-Controlled Choices
```

未来：

```text
Build Planner
Ending Flowchart
Interactive Map
```

---

## 引擎 B：搜索内容获得 Google 流量

重点不是百科，而是：

```text
问题词
具体任务词
具体选择词
Bug / Fix 词
how to
where to find
should you
what happens if
can you
best order
missable
```

形成：

> 搜索进入攻略 → 使用工具 → 工具再链接相关攻略 → 返回继续玩游戏后再次访问。

这是整个项目最关键的产品闭环。

---

# 4. 目标用户

## 用户 1：一周目尽可能全清玩家

搜索：

```text
can you complete all quests blood of dawnwalker
blood of dawnwalker quest order
blood of dawnwalker completionist route
```

真实问题：

> 我只有 30 天，怎么尽可能多体验内容？

对应：

**Quest Order + Completionist Route + Planner**

---

## 用户 2：害怕错过内容的人

搜索：

```text
blood of dawnwalker missable quests
missable items
missable romance
missable achievements
```

真实问题：

> 我现在继续主线，会不会永久错过什么？

对应：

**Missable Checklist**

---

## 用户 3：面对选择不敢按的人

搜索：

```text
should you xxx blood of dawnwalker
blood of dawnwalker choices consequences
what happens if xxx
```

真实问题：

> 给我建议，但别把后面的故事全剧透。

对应：

**Spoiler-Light Choices**

---

## 用户 4：遇到性能 Bug 的 PC 玩家

搜索：

```text
blood of dawnwalker stuttering
blood of dawnwalker best settings
blood of dawnwalker crashing
blood of dawnwalker low fps
```

真实问题：

> 我现在就想把游戏正常玩起来。

对应：

**Fixes**

这是一批搜索意图极强、转化非常直接的用户。

---

## 用户 5：卡在具体任务、Boss、道具上的玩家

搜索：

```text
quest name walkthrough
boss name how to beat
item name location
skill manual location
```

对应：

**原子化长尾攻略页**

---

# 5. 域名与品牌

## 主站原则

只运营 **1 个站**。

不同时做：

```text
dawnwalkerbuilds.com
dawnwalkerboss.com
dawnwalkermap.com
```

即使额外注册，也只作为品牌保护，不建立独立内容。

---

## 推荐主站域名

现有候选优先：

```text
bloodofdawnwalkerguide.com
```

原因：

- 游戏全名明确；
- Guide 意图清楚；
- 不限制未来方向；
- 可以同时承载 Planner、Fix、Build、Boss、Choice。

---

## Site Name

建议：

```text
Dawnwalker Guide
```

页面 Logo 可以简写：

```text
DW GUIDE
```

但 SEO Title 中重要页面仍适当出现：

```text
Blood of Dawnwalker
```

不要为了缩短标题把完整游戏实体名完全丢掉。

---

# 6. 最终网站结构

采取：

```text
/tools/
/guides/
/fixes/
/news/
```

四大目录。

优势：

- URL 简单；
- 用户容易理解；
- 未来扩展清晰；
- 不会产生 4～5 层深目录。

---

## 完整结构

```text
/
│
├── /tools/
│   ├── /tools/30-day-planner/
│   ├── /tools/missable-checklist/
│   ├── /tools/choices/
│   └── /tools/build-planner/        [P2]
│
├── /guides/
│   ├── /guides/time-limit/
│   ├── /guides/quest-order/
│   ├── /guides/completionist-route/
│   ├── /guides/choices/
│   ├── /guides/missable-quests/
│   ├── /guides/beginner/
│   │
│   ├── /guides/quests/
│   ├── /guides/quests/[quest]/
│   │
│   ├── /guides/bosses/
│   ├── /guides/bosses/[boss]/
│   │
│   ├── /guides/builds/
│   ├── /guides/builds/[build]/
│   │
│   ├── /guides/romance/
│   ├── /guides/romance/[character]/
│   │
│   ├── /guides/endings/
│   ├── /guides/weapons/
│   └── /guides/manual-locations/
│
├── /fixes/
│   ├── /fixes/stuttering/
│   ├── /fixes/best-settings/
│   ├── /fixes/crashing/
│   ├── /fixes/steam-deck/
│   └── /fixes/ps5/
│
├── /news/
│   └── /news/[slug]/
│
├── /updates/
├── /about/
├── /editorial-policy/
├── /contact/
└── /privacy/
```

---

# 7. 一个重要调整：Tool 与 Guide 不互相抢词

例如：

### `/guides/missable-quests/`

主要满足 Google：

> 哪些任务会错过？

内容型页面。

---

### `/tools/missable-checklist/`

主要完成动作：

> 帮我勾选已经完成的内容。

工具型页面。

二者互链，但搜索意图不同。

---

# 8. 页面优先级

不要机械按照 KD 从低到高。

统一采用：

```text
Priority Score =
需求确定性
× 搜索意图强度
× SERP 可突破性
× 数据可验证程度
÷ 制作成本
```

---

# P0：第一批必须上线

## 第一组：首发即时痛点

### 1. Stuttering

```text
/fixes/stuttering/
```

关键词：

```text
blood of dawnwalker stuttering
blood of dawnwalker stutter fix
blood of dawnwalker fps drops
```

---

### 2. Best Settings

```text
/fixes/best-settings/
```

关键词：

```text
blood of dawnwalker best settings
blood of dawnwalker pc settings
blood of dawnwalker optimized settings
```

---

### 3. Crashing

```text
/fixes/crashing/
```

关键词：

```text
blood of dawnwalker crashing
blood of dawnwalker crash on startup
blood of dawnwalker shader crash
```

---

# 第二组：项目真正护城河

### 4. Time Limit

```text
/guides/time-limit/
```

---

### 5. Quest Order

```text
/guides/quest-order/
```

---

### 6. Missable Quests

```text
/guides/missable-quests/
```

---

### 7. Choices & Consequences

```text
/guides/choices/
```

---

### 8. 30-Day Planner

```text
/tools/30-day-planner/
```

---

### 9. Missable Checklist

```text
/tools/missable-checklist/
```

---

# 第三组：最容易获得具体长尾排名

首发至少建立：

```text
3–5 个 Quest 页面
3–5 个 Choice 页面
1–2 个 Boss 页面
```

不要先追求覆盖数量。

---

# P1

```text
Romance
Specific Romance Characters
All Endings
Specific Bosses
Best Builds
Human Build
Vampire Build
Legendary Weapons
Manual Locations
Steam Deck
PS5 Performance
```

---

# P2

```text
Build Planner
Ending Flowchart
Achievements
Full Walkthrough
Interactive Map
Lore
```

---

# 9. 首页最终定位

首页不只是 SEO 分类页，也不只是博客。

首页负责三个任务：

### ① Google 明白网站是什么

### ② 新用户立刻找到当前问题

### ③ Planner 得到最大曝光

---

# 首页 TDH

## Title

```text
Blood of Dawnwalker Guide & 30-Day Planner
```

比单纯：

```text
Dawnwalker Guide
```

略长，但实体识别和搜索意图更完整。

---

## Description

```text
Plan your 30 days in The Blood of Dawnwalker. Avoid missable quests, check spoiler-safe choices, find the best quest order, and fix common PC performance issues.
```

---

## H1

```text
Plan Your 30 Days Without Missing What Matters
```

---

# 10. 首页布局

## Section 1：Hero

```text
H1:
Plan Your 30 Days Without Missing What Matters

Subtitle:
A spoiler-controlled guide to quests, choices,
missables and time management in The Blood of Dawnwalker.

[Build My Route]

[See Missable Quests]
```

---

# Section 2：What Do You Need Right Now?

四个入口：

```text
I don't know what quest to do next
→ Quest Order

I'm afraid I'll miss something
→ Missable Checklist

I need help with a choice
→ Choices

My game runs badly
→ Performance Fixes
```

这比：

```text
Bosses
Builds
Weapons
Romance
```

更符合真实用户当下心理。

---

# Section 3：30-Day Planner Preview

直接显示真实工具：

| Quest | Time | Day/Night | Missable | Reward | |
|---|---|---|---|---|---|
| XXX | 2 | Night | Yes | Skill | Add |
| XXX | 1 | Either | No | Weapon | Add |

右侧：

```text
Current plan:
Used: 7
Remaining: XX
Potential lockouts: 2
```

CTA：

```text
Open Full Planner
```

---

# Section 4：Popular Problems

```text
What happens after 30 days?
Can you complete every quest?
What actually advances time?
Which quests are missable?
Should you choose X?
```

---

# Section 5：Fix Current Problems

```text
Stuttering
Best PC Settings
Crashing
Steam Deck
PS5 Performance
```

---

# Section 6：Recently Verified

不用：

```text
Latest Posts
```

改为：

```text
Recently Verified
```

卡片显示：

```text
Verified for Patch X.X.X
Updated: Sep xx
```

强化站点最大卖点：

> 准确。

---

# 11. 全局导航

Desktop：

```text
Guides
Planner
Choices
Quests
Bosses
Builds
Fixes
Search
```

不要把 News 放进一级导航核心位置。

News 可以：

```text
More → News
```

---

# 12. Spoiler System

这是本站非常重要的交互差异化。

全局三档：

```text
No Spoilers
Light Spoilers
Full Spoilers
```

使用 LocalStorage 保存。

---

## No Spoilers

只显示：

```text
Recommended Choice
May lock content
Has long-term consequence
Time cost
```

不显示人物死亡、结局、完整剧情。

---

## Light Spoilers

例如：

> This choice affects Anca's later questline.

而不是：

> Anca dies in Quest X.

---

## Full Spoilers

完整展示：

```text
Outcome
Character fate
Reward
Quest lockout
Ending impact
Romance impact
```

---

# 13. Choices Guide

这是本站第二核心产品。

---

## `/guides/choices/`

列表：

```text
Quest
Choice
Recommended
Time Cost
Lockout
Romance
Ending Impact
```

默认隐藏具体后果。

---

## 独立 Choice 页面

URL：

```text
/guides/choices/[slug]/
```

页面模板：

```text
H1:
Should You [Choice] in Blood of Dawnwalker?

Quick Answer

Recommended Option:
XXX

Spoiler Level:
No Spoilers / Light / Full
```

然后：

### Choice Comparison

| Option | Recommended For | Time | Reward | Lockout |
|---|---|---:|---|---|

---

### Full Consequences

默认折叠。

---

### Can You Change This Later?

直接回答。

---

### Related Quest

链接具体 Quest。

---

# 14. 30-Day Planner MVP

这是整个网站最有价值的产品。

但 MVP **不要一开始做 AI 自动最优路径算法**。

---

## V1 只做五件事

### ① 任务数据库

### ② 筛选

### ③ Add to Plan

### ④ 时间统计

### ⑤ Lockout Warning

已经足够形成真正可用产品。

---

# 15. Planner 输入

用户可设置：

```text
Current Day
Current Progress
Spoiler Level
```

目标：

```text
See Most Content
Avoid Missables
Save Family First
Romance
Best Equipment
Main Story Focus
```

过滤：

```text
Main Quest
Side Quest
Day
Night
Missable
Character
Faction
Reward
Verified Only
```

---

# 16. Planner 每个任务的数据

必须包含：

```text
Quest Name
Quest Type
Time Cost
Day/Night
How to Start
Prerequisites
Deadline
Missable
Lockouts
Rewards
Recommended For
Verification Status
Last Verified
Patch Version
```

---

# 17. Planner 输出

侧栏：

```text
YOUR PLAN

Selected quests: 8
Estimated time cost: XX
Remaining time: XX

Warnings:
2 possible quest lockouts
1 missable NPC event
```

---

# 18. Planner V2

当真实数据积累以后，再增加：

```text
Recommended Route
Completionist Route
Romance Route
Best Gear Route
Low-Spoiler Route
```

---

# 19. Planner V3

最后才考虑：

```text
Automatic Route Optimization
Dependency Graph
Ending Prediction
Interactive Timeline
```

---

# 20. Quest 页面统一模板

```text
H1:
[Quest Name] Walkthrough — Blood of Dawnwalker

Quick Answer

Verification:
Verified / Community Report / Unverified

Game Version:
X.X.X
```

---

## Quest Overview

| 字段 | 内容 |
|---|---|
| Type | |
| Location | |
| Time Cost | |
| Day/Night | |
| Missable | |
| Deadline | |
| Prerequisite | |
| Rewards | |

---

## How to Start

直接回答。

---

## Step-by-Step Walkthrough

按步骤展开。

---

## Important Choices

链接：

```text
Choice Detail Page
```

---

## Missable / Lockout Warning

必须显眼。

---

## Rewards

---

## Known Bugs

如果有。

---

## Related Guides

---

# 21. Boss 页面模板

不要先建立一篇 5000 字：

```text
All Bosses Guide
```

真正优先做：

```text
how to beat [boss name]
```

---

## 模板

```text
H1:
How to Beat [Boss] in Blood of Dawnwalker
```

Quick Strategy：

3–5 行直接答案。

然后：

```text
Location
How to Unlock
Recommended Level
Recommended Skills
Recommended Gear
Weaknesses

Phase 1
Phase 2
Phase 3

Dangerous Attacks
How to Dodge / Counter
Rewards
Related Quest
```

---

# 22. Build 页面模板

不能套：

```text
Tank
DPS
Speed Build
```

这种通用 RPG 模板。

应该根据本游戏真实机制建立。

例如：

```text
Early Game Build
Human Day Build
Vampire Night Build
Swordmastery Build
Witchcraft Build
Vampirism Build
```

每个 Build：

```text
Best For
Required Level
Required Skills
Skill Order
Equipment
Day Strength
Night Strength
Boss Matchups
Weaknesses
Patch Version
```

---

# 23. Performance Fix 页面

性能页的重要原则：

> 不允许把 Reddit 某个人的解决方法直接写成“100% Fix”。

每一条 Solution 标记：

```text
Official Fix
Tested by Us
Multi-User Confirmed
Community Report
Experimental
```

---

# `/fixes/stuttering/`

TDH：

```text
Title:
Blood of Dawnwalker Stuttering Fix — PC Performance Guide

H1:
How to Fix Stuttering in Blood of Dawnwalker
```

结构：

```text
Quick Fix
Current Patch Status
Shader Compilation
Traversal Stutter
Graphics Settings
Driver
Frame Generation
Known Engine Issues
Community Workarounds
```

---

# `/fixes/best-settings/`

TDH：

```text
Title:
Blood of Dawnwalker Best PC Settings — FPS & Quality Guide

H1:
Best PC Settings for Blood of Dawnwalker
```

测试必须记录：

```text
CPU
GPU
RAM
Resolution
Upscaler
Frame Generation
Game Version
Average FPS
1% Low
```

---

# 24. News 策略重大调整

竞品日更 News 值得借鉴，但：

> **不为了“新鲜度 SEO 信号”机械日更。**

News 只发四类：

### ① Patch

```text
Patch 1.x.x Notes
```

### ② Developer Announcement

### ③ DLC / Update

### ④ 会直接改变本站攻略的信息

例如：

```text
Quest bug fixed
Skill nerfed
Timer changed
Performance patch released
```

---

## 不发

```text
今天某主播玩了 Dawnwalker
媒体评分汇总
Steam 排名变化
重复旧新闻
AI 改写其他媒体文章
```

News 的目标：

> 服务现有攻略内容更新。

不是制造文章数量。

---

# 25. 内容标签系统

保留竞品的轻量标签思路。

标签：

```text
beginner
quest
choice
missable
boss
build
system
performance
romance
ending
item
patch
```

标签主要用于：

- UI；
- Related Content；
- 搜索过滤。

初期不一定让所有 Tag Archive 进入 Google 索引。

---

# 26. 视觉方案

对标直接竞品的暗黑哥特语言，但不直接复制。

---

## 色彩

```text
Background:
#0F0D0C

Surface:
#1A1715

Card:
#24201D

Primary Text:
#E8DDC5

Secondary Text:
#A99E8C

Blood Red:
#A62635

Warning Gold:
#C49A52

Night Blue:
#7E91AD
```

---

## 字体

标题：

```text
Cinzel / 类中世纪 Serif
```

正文：

```text
Inter
```

如果性能或字体加载成本高，优先系统字体。

---

## 背景

允许：

- 轻微纸张 / grain；
- 柔和血红渐变；
- Day / Night 背景变化。

禁止：

- 重型粒子；
- 全屏背景视频；
- 大量动态火星；
- 页面滚动特效。

因为攻略工具首先必须：

> 快。

---

# 27. 页面配图策略

优先级：

```text
1. 自己实机截图
2. 官方 Press Kit / 官方宣传素材
3. 官方 YouTube 截图并正确注明
4. 原创装饰插画
```

AI 插画可以用于：

```text
Category Cover
OG Image
Decorative Background
```

不能用 AI 图冒充：

```text
Boss screenshot
Item location
Map
Quest objective
```

---

# 28. 技术 SEO

必须上线：

```text
SSR / SSG readable content
robots.txt
sitemap.xml
canonical
Breadcrumb
OpenGraph
Twitter Card
Schema
404
RSS
Google Analytics
GSC
```

---

# 29. Schema

按页面类型：

首页：

```text
WebSite
Organization
```

Guide：

```text
Article
BreadcrumbList
```

FAQ：

只有真实页面展示 FAQ 时使用：

```text
FAQPage
```

工具：

```text
WebApplication
```

不要全站乱塞同一种 Schema。

---

# 30. 未完成页面规则

禁止：

> Day 1 创建 30 个空页面并提交 sitemap。

正确规则：

### 没内容

不生成。

或者：

```text
noindex
```

### 有可直接解决用户问题的内容

再发布。

---

# 31. 页面发布最低标准

一篇 Guide 上线前必须满足：

```text
✓ 核心问题有明确答案
✓ 所有关键数据有依据
✓ 至少一个独特信息元素
✓ 有内部链接
✓ 有更新时间
✓ 有 Verification Status
✓ 有 Game Version
✓ Title / Description / H1 完整
✓ OG Image
✓ Mobile 可读
```

---

# 32. 数据验证制度

所有游戏机制信息分五级：

```text
Verified in Retail Build
Officially Confirmed
Multi-Source Confirmed
Community Report
Unverified
```

---

## 来源优先级

```text
1. 自己实机
2. 官方游戏 / 开发者 / Patch Notes
3. 完整 Gameplay 视频
4. 多个独立社区来源
5. 单一社区反馈
6. 其他攻略站
```

竞争对手只能：

> 用于发现需求。

不能：

> 作为最终事实来源直接改写。

---

# 33. 技术数据结构

```ts
type VerificationStatus =
  | "verified-retail"
  | "official-confirmed"
  | "multi-source-confirmed"
  | "community-report"
  | "unverified";

type SpoilerLevel =
  | "none"
  | "light"
  | "full";
```

Quest：

```ts
interface Quest {
  slug: string;
  name: string;

  type: "main" | "side" | "activity";
  location?: string;

  timeCost: number | null;
  timeOfDay: "day" | "night" | "either" | "unknown";

  prerequisites: string[];

  missable: boolean | null;
  deadline?: string;

  lockouts: string[];
  rewards: string[];

  routeTags: string[];

  spoilerSafeSummary: string;
  fullSpoilerSummary?: string;

  verificationStatus: VerificationStatus;

  gameVersion: string;
  lastVerified: string;
}
```

重要：

```text
null ≠ 0
```

如果不知道 Time Cost，必须显示：

```text
Unknown
```

不能自动脑补。

---

# 34. Search 是重要产品，而不是附属功能

全站搜索支持：

```text
Quest
Choice
Boss
Item
NPC
Error
Setting
```

输入：

```text
Anca
stutter
Xanthe
30 days
```

立即展示对应结果。

---

## Search No Result

必须埋点：

```text
search_no_result
```

因为这些就是：

> 用户亲口告诉你的下一批关键词。

---

# 35. 内链模型

核心链：

```text
HOME
 ↓
Planner
 ↓
Quest
 ↓
Choice
 ↓
Ending / Romance
```

---

另一条：

```text
Google
 ↓
Fix Page
 ↓
Beginner Guide
 ↓
Planner
```

---

Boss：

```text
Boss
→ Build
→ Weapon
→ Related Quest
```

---

Choice：

```text
Choice
→ Quest
→ Romance
→ Ending
→ Missable
```

---

# 36. 社区推广

不把：

```text
Reddit
Steam
GameFAQs
```

当外链平台。

把它们当：

> 问题发现 + 用户反馈 + 工具传播渠道。

---

## 正确方式

Reddit 有人问：

> Can I finish every side quest before the deadline?

回答：

1. 先直接给答案；
2. 解释规则；
3. 给一个简单路线；
4. 如果 Planner 确实能帮助规划，再附链接：

```text
I built a small planner for this...
```

---

## 错误方式

```text
Great game!
Check my guide:
xxx.com
```

重复发多个 Subreddit。

---

# 37. 首发执行计划

# Day 1

完成：

```text
域名
Next.js
基础视觉
Header/Footer
首页
Guide Template
Fix Template
robots
sitemap
schema
analytics
GSC
```

---

# Day 2

发布：

```text
/fixes/stuttering/
/fixes/best-settings/
/fixes/crashing/
```

并开始收集社区问题。

---

# Day 3

发布：

```text
/guides/time-limit/
/guides/quest-order/
/guides/missable-quests/
```

---

# Day 4

开发：

```text
/tools/30-day-planner/
```

V1：

```text
任务列表
Filter
Add
Remove
Time Sum
Warning
LocalStorage
```

---

# Day 5

发布：

```text
/guides/choices/
/tools/missable-checklist/
```

并建立：

```text
3 个具体 Choice 页面
```

---

# Day 6–7

根据社区真实问题建立：

```text
Quest Detail
Choice Detail
Boss Detail
```

而不是机械填分类。

目标：

```text
8–15 个高价值长尾页面
```

而不是：

```text
50 篇泛攻略。
```

---

# Day 8–14

完全由真实数据驱动：

```text
GSC
Google Autocomplete
Reddit
Steam Discussions
YouTube comments
Site Search
```

哪个问题频繁出现，就优先做哪个页面。

---

# 38. KPI

两周不是看：

> 有没有一天 1 万流量。

而看“搜索模型有没有成立”。

---

## 核心 SEO KPI

```text
Indexed Pages
Impressions
Clicks
Queries / Page
Pages Receiving Impressions
Average Position
```

---

## 产品 KPI

```text
planner_start
planner_add_quest
planner_return
spoiler_toggle
choice_expand
search
search_no_result
missable_check
incorrect_report
```

---

# 39. 两周 Go / Hold / Stop

## GO

满足其中至少两项：

```text
近 7 天 GSC 展示 > 1,000

至少 5 个页面开始产生真实曝光

至少 3 个不同关键词簇产生点击

Planner Start Rate > 8%

社区出现自然引用 / 分享

Search No Result 持续产生新需求
```

继续投入。

---

# HOLD

表现：

```text
有展示
但点击不强
关键词集中
Planner 有使用
```

处理：

> 继续做已经出现 Impression 的关键词，不扩完整 Wiki。

---

# STOP 大规模扩展

如果：

```text
两周后多数页面仍无展示
游戏热度明显快速下降
SERP 已被大型站全面覆盖
Planner 基本没有使用
无法持续取得可靠游戏数据
```

则：

- 保留现有页面；
- 维护已有排名；
- 不继续做 Map / Lore / 百科。

---

# 40. 明确不做事项

MVP 阶段禁止：

```text
❌ 三个独立网站
❌ 完整 Interactive Map
❌ 用户注册
❌ 会员系统
❌ 评论系统
❌ 论坛
❌ 多语言
❌ 完整 Lore Wiki
❌ 100 篇 AI 批量攻略
❌ AI 猜 Boss 数据
❌ AI 猜 Choice Consequence
❌ 重型首页动画
❌ 日更垃圾 News
```

---

# 41. 最终产品优先级

## P0

```text
Performance Fix
Time System
Quest Order
Missables
Choices
30-Day Planner
Specific Quest Pages
```

---

## P1

```text
Boss
Build
Romance
Ending
Weapons
Manuals
Steam Deck
```

---

## P2

```text
Achievements
Full Walkthrough
Build Planner
Ending Flowchart
Interactive Map
```

---

## P3

```text
Lore
Review
泛 Tips
百科型 Character Pages
```

---

# 42. 最终竞争定位

不要试图：

> 做一个比 Fextralife 更大的 Wiki。

也不要只试图：

> 做一个比 dawnwalker.wiki 页面更多的网站。

真正应该建立的认知是：

> **Google 上搜具体问题，可以在这里快速得到准确答案；玩到不知道下一步怎么走，可以回来打开 Planner。**

最终护城河不是域名，也不是 KD。

而是这五样：

```text
30-Day Planner
Missable Database
Spoiler-Controlled Choices
Verified Game Data
High-Intent Long-Tail Pages
```

---

# 43. 最终首页价值闭环

用户第一次：

```text
Google
→ Stuttering Fix
```

第二次：

```text
Quest Search
→ Choice Guide
```

第三次：

```text
30-Day Planner
```

最终从：

> “Google 随机搜到的攻略网站”

变成：

> “我玩 Dawnwalker 时会回来打开的网站。”

**这才是本项目最终应该追求的产品形态。**