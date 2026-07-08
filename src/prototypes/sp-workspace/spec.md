# 云梦泽服务商工作台 - 原型规格文档

## 项目概述
中国石油旗下能源与化工产业智慧电商服务平台 — 服务商自助服务模块原型。

## 页面清单

### 服务商端 (sp-portal) - 13 个页面
| 文件 | 页面 | 类型 |
|------|------|------|
| workspace.tsx | 服务商工作台 | 工作台 |
| register.tsx | 注册服务商 | 多步表单(4步) |
| register-change.tsx | 注册服务商信息变更 | 多Tab表单(3Tab) |
| admission.tsx | 正式准入申请 | 多步表单(3步) |
| info-maintain.tsx | 信息维护 | 多步表单(2步) |
| qual-maintain.tsx | 资质维护 | 文件上传 |
| service-maintain.tsx | 服务维护 | 列表+筛选+CRUD |
| info-query.tsx | 信息查询 | 只读详情 |
| progress-query.tsx | 进度查询 | 列表+筛选+详情 |
| freeze-query.tsx | 冻结解冻查询 | 列表+筛选+详情 |
| register-detail.tsx | 注册申请详情 | 详情+时间线 |
| admission-detail.tsx | 准入申请详情 | 详情+时间线 |
| draft-list.tsx | 草稿管理 | 列表+CRUD |

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

## 交互增强

| 交互类型 | 覆盖页面 |
|---------|---------|
| 表单校验 | register, admission, info-maintain, register-change |
| 审核弹窗 | 所有含审核操作的页面 |
| 状态时间线 | progress-query, freeze-query, register-detail, admission-detail |
| 文件预览/下载 | qual-maintain, register-detail, admission-detail |
| 嵌入式详情面板 | progress-query, freeze-query |
| 新增/编辑弹窗 | service-maintain |
| 删除确认 | service-maintain, draft-list |
| 草稿管理 | draft-list |

## 预览地址
http://localhost:51720/prototypes/sp-workspace
