# 云梦泽服务商管理门户 - 原型规格文档

## 项目概述
中国石油旗下能源与化工产业智慧电商服务平台 — 服务商管理模块原型还原。

## 页面清单

### 服务商端 (sp-portal) - 11 个页面
| 文件 | 页面 | 类型 |
|------|------|------|
| home.tsx | 入口-企业中心首页 | 入口页 |
| workspace.tsx | 服务商工作台 | 工作台 |
| register.tsx | 注册服务商 | 多步表单 |
| register-change.tsx | 注册服务商信息变更 | 多步表单 |
| admission.tsx | 正式准入申请 | 多步表单 |
| info-maintain.tsx | 信息维护 | 多步表单 |
| qual-maintain.tsx | 资质维护 | 文件上传 |
| service-maintain.tsx | 服务维护 | 列表+筛选 |
| info-query.tsx | 信息查询 | 只读详情 |
| progress-query.tsx | 进度查询 | 列表+筛选 |
| freeze-query.tsx | 冻结解冻查询 | 列表+筛选 |

### 管理单位端 (admin-portal) - 25 个页面
| 目录 | 文件 | 页面 |
|------|------|------|
| reg-audit/ | review.tsx | 服务商注册审核 |
| reg-audit/ | view.tsx | 服务商注册查看 |
| reg-audit/ | change-review.tsx | 注册服务商变更审核 |
| reg-audit/ | change-view.tsx | 注册服务商变更查看 |
| admission/ | entry.tsx | 信息录入 |
| admission/ | edit.tsx | 信息编辑 |
| admission/ | review.tsx | 信息复核 |
| admission/ | query.tsx | 信息查询 |
| admission/ | freeze-apply.tsx | 冻结申请 |
| info-change/ | maint-edit.tsx | 维护编辑 |
| info-change/ | maint-review.tsx | 维护复核 |
| info-change/ | maint-query.tsx | 维护查询 |
| disposal/ | freeze-apply.tsx | 冻结申请 |
| disposal/ | unfreeze-apply.tsx | 解冻申请 |
| disposal/ | freeze-query.tsx | 冻结解冻查询 |
| disposal/ | review.tsx | 复核 |
| query/ | mdg-query.tsx | MDG信息查询 |
| query/ | service-dir.tsx | 服务管理目录 |
| query/ | reg-query.tsx | 注册服务商查询 |
| query/ | formal-query.tsx | 正式服务商查询 |
| query/ | category-query.tsx | 准入服务分类查询 |
| query/ | process-query.tsx | 流程查询 |
| config/ | dir-config.tsx | 专业服务目录配置 |
| config/ | doc-config.tsx | 要件配置 |
| config/ | freeze-doc.tsx | 冻结资质文件设定 |

### 关键人员管理 (key-personnel) - 3 个页面
| 文件 | 页面 |
|------|------|
| add.tsx | 关键人员新增 |
| approve.tsx | 关键人员审批 |
| view.tsx | 关键人员查看 |

### 现场考察 (site-inspection) - 3 个页面
| 文件 | 页面 |
|------|------|
| manage.tsx | 现场考察管理（服务商端） |
| manage-admin.tsx | 现场考察管理（管理端） |
| review.tsx | 现场考察审核 |

## 架构设计

### 主题系统
- 使用 **Ant Design ConfigProvider** 全局注入 YMZEC 主题，`colorPrimary: #ff4d4f`（YMZEC 品牌红）, `borderRadius: 4`
- 所有颜色、间距、圆角通过 `theme.useToken()` 动态获取，无硬编码色值
- 页面布局使用 Ant Design `Layout` / `Sider` / `Content` / `Header` 组件体系
- 侧边菜单使用 Ant Design `Menu` 组件

### 共享组件
- `common/portal-layout.tsx` - 门户共享布局（Header + Sider + Content），使用 Ant Design Layout + theme tokens
- `common/components.tsx` - 公共UI组件集，基于 Ant Design 原生组件（Table, Steps, Card, Tabs, Form, Button, Input, Select, Typography）
- `common/menu-data.ts` - 各门户侧边栏菜单配置

### 导航与交互

**首页**（入口页面 `index.tsx`）为空白布局页，不展示具体内容：
- 顶部 Header 显示"云梦泽"品牌标识和四个门户切换按钮（服务商工作台 / 服务商管理端 / 关键人员管理 / 现场考察）
- 左侧 Sider 展示当前选中门户的菜单分组与菜单项
- 主内容区显示引导文案："请从左侧菜单选择一个页面开始浏览"
- Ant Design `Button` 组件用于门户切换，选中态使用 `type="primary"`
- 点击侧边栏菜单项 → 通过 `React.lazy` 动态加载对应子页面组件
- 子页面自身携带 `PortalLayout`（包含 Header + Sider + 内容），替换整个页面视图
- 切换顶部门户按钮 → 回到空白首页，Sider 切换为对应门户的菜单
- URL 路径反映当前门户（如 `/prototypes/petroleum-portal/admin`），支持浏览器前进/后退

**页面映射**：`index.tsx` 中维护 `pageMap`，将 `menu-data.ts` 中每个菜单项的 `path` 映射到对应的子页面组件

### 页面模式
1. **多步表单** - 使用 Steps + Card + Form 组件（注册、准入、信息维护），支持步骤前进/后退、表单校验跨步骤
2. **列表+筛选** - 使用 Form + Table 组件（查询、审核页面），筛选条件联动表格数据过滤，支持分页和行选择
3. **只读详情** - 使用 Card + Descriptions 组件（信息查询），提供返回列表入口
4. **文件上传** - 使用 Card + Upload 组件（资质维护），支持实际上传交互反馈
5. **配置页面** - 使用 Tabs + Card 组件（目录配置、要件配置），保存配置有反馈提示

### 交互增强（v2.0）

| 交互类型 | 实现方式 | 覆盖页面 |
|---------|---------|---------|
| **搜索/筛选真实过滤** | `useFilterData` hook：filterValues state 变化时对 mock 数据做文本/选择匹配 | 所有列表页（30+） |
| **表格分页** | `DataTable` 默认启用 `pagination={{ pageSize: 10, showSizeChanger: true, showTotal: true }}` | 所有表格页（25+） |
| **行选择+批量操作** | `Table.rowSelection` 联动"批量审核/批量删除"按钮，`message` 反馈结果 | review/approve/add 等页面 |
| **操作按钮弹窗** | `Modal.confirm` 或自定义 `Modal` 组件，点审核/审批/处理时弹出填写审批意见 | 审核/审批/处置页面 |
| **表单校验** | `Form` 组件 `rules` 属性，提交时 validate | 所有表单页（15+） |
| **操作反馈** | `message.success/error/info` 全局提示 + `Spin` 加载态 | 所有含操作的页面 |
| **多步表单导航** | `Steps current` 配合"上一步/下一步/提交"按钮，实时切换表单内容 | register/admission/info-maintain/entry |
| **Tab 联动数据** | `Tabs onChange` 切换时过滤表格 `dataSource`（按状态/类型分组展示） | progress-query/freeze-query/review 等 |
| **树节点操作** | 树节点勾选 + 搜索过滤子节点 | dir-config |

### 设计规范
- 主色：`colorPrimary: #ff4d4f`（YMZEC 品牌红）
- 成功色：`colorSuccess: #52c41a`
- 警告色：`colorWarning: #faad14`
- 错误色：`colorError: #ff4d4f`
- 布局背景：`colorBgLayout: #f5f5f5`
- 卡片背景：`colorBgContainer: #ffffff`
- 边框：`colorBorderSecondary: #f0f0f0`
- 正文颜色：`colorText: rgba(0,0,0,0.85)`
- 辅助文字：`type="secondary"`
- 圆角：`borderRadius: 4px`
- 字体：14px 正文，12px 辅助文字，16px/20px/24px 标题层级

## 数据需求
- 服务商信息（名称、统一社会信用代码、准入来源等）
- 审核记录（审核人、审批状态、审批意见）
- 考察方案（编号、名称、类型、状态）
- 关键人员（姓名、身份证号、手机号、状态）

## 预览地址
http://localhost:51720/prototypes/petroleum-portal
