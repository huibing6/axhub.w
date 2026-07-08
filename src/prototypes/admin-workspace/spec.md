# 服务商管理工作台 - 原型规格文档

## 项目概述
中国石油旗下能源与化工产业智慧电商服务平台 — 服务商管理模块原型。

## 页面清单

### 管理单位端 (admin-portal) - 29 个页面
| 目录 | 文件 | 页面 |
|------|------|------|
| reg-audit/ | review.tsx | 服务商注册审核 |
| reg-audit/ | view.tsx | 服务商注册查看 |
| reg-audit/ | change-review.tsx | 注册服务商变更审核 |
| reg-audit/ | change-view.tsx | 注册服务商变更查看 |
| reg-audit/ | reg-detail.tsx | 注册审核详情 |
| admission/ | entry.tsx | 信息录入 |
| admission/ | edit.tsx | 信息编辑 |
| admission/ | review.tsx | 信息复核 |
| admission/ | query.tsx | 信息查询 |
| admission/ | admission-detail.tsx | 准入办理详情 |
| info-change/ | maint-edit.tsx | 维护编辑 |
| info-change/ | maint-review.tsx | 维护复核 |
| info-change/ | maint-query.tsx | 维护查询 |
| info-change/ | change-detail.tsx | 变更详情 |
| disposal/ | freeze-apply.tsx | 冻结申请 |
| disposal/ | unfreeze-apply.tsx | 解冻申请 |
| disposal/ | freeze-query.tsx | 冻结解冻查询 |
| disposal/ | review.tsx | 复核 |
| disposal/ | disposal-detail.tsx | 处置详情 |
| query/ | mdg-query.tsx | MDG信息查询 |
| query/ | service-dir.tsx | 服务管理目录 |
| query/ | reg-query.tsx | 注册服务商查询 |
| query/ | formal-query.tsx | 正式服务商查询 |
| query/ | category-query.tsx | 准入服务品类查询 |
| query/ | process-query.tsx | 流程查询 |
| config/ | dir-config.tsx | 专业服务品类配置 |
| config/ | doc-config.tsx | 要件配置 |
| config/ | freeze-doc.tsx | 冻结资质文件设定 |

## 交互增强

| 交互类型 | 覆盖页面 |
|---------|---------|
| 审核弹窗 | reg-audit/review, admission/review, info-change/maint-review, disposal/review |
| 状态时间线 | 所有详情页 |
| 文件预览 | 所有详情页 |
| 嵌入式详情面板 | 所有查询页(行点击展开) |
| 编辑弹窗 | admission/edit |
| 保存确认 | config/dir-config, config/doc-config, config/freeze-doc |
| 筛选功能 | reg-audit/view, reg-audit/change-view |

## 预览地址
http://localhost:51720/prototypes/admin-workspace
