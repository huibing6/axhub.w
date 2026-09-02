const s={S0101000:[{name:"咨询服务资质证书",required:!0,desc:"咨询类企业应具备的行业资质证书"},{name:"专业人员执业资格证明",required:!0,desc:"主要咨询人员的执业资格证书"},{name:"质量管理体系认证证书",required:!1,desc:"ISO 9001 等质量管理体系认证"}],S0102000:[{name:"勘查资质证书",required:!0,desc:"对应级别的勘查类资质证书"},{name:"安全生产许可证",required:!0,desc:"有效期内的安全生产许可证明"},{name:"主要设备检测报告",required:!1,desc:"勘查设备的检验检测合格报告"}],S0301000:[{name:"生产许可证",required:!0,desc:"相关生产加工环节的生产许可证"},{name:"特种设备制造许可",required:!1,desc:"涉及特种设备制造时提供"},{name:"产品质量检测报告",required:!1,desc:"主要产品的质量检验报告"}],S0201000:[{name:"物化探专业资质证书",required:!0,desc:"地震勘探类专业资质证书"},{name:"安全生产许可证",required:!0,desc:"有效期内的安全生产许可证明"}],S0501000:[{name:"科技服务资质证书",required:!0,desc:"科技项目服务类资质证书"},{name:"研发团队人员资质证明",required:!1,desc:"主要研发人员的技术职称证明"}]};function i(e){const t=s[e];if(t)return t;const n=e.replace(/0+$/,"");return s[n]||[]}const c={S0101000:`请上传以下材料：
1. 企业营业执照副本（彩色扫描件）
2. 咨询服务资质证书
3. 主要咨询人员执业资格证明（不少于3人）
4. 近三年同类项目业绩合同（至少3份）
5. 质量管理体系认证证书（如有）`,S0102000:`请上传以下材料：
1. 企业营业执照副本（彩色扫描件）
2. 勘查资质证书（对应级别）
3. 安全生产许可证（有效期内）
4. 主要勘查设备清单及检验报告
5. 近三年同类项目业绩证明（至少2份）`,S0301000:`请上传以下材料：
1. 企业营业执照副本（彩色扫描件）
2. 生产许可证
3. 产品质量检测报告
4. 特种设备制造许可证（如涉及）
5. 近三年同类项目业绩合同（至少2份）`,S0201000:`请上传以下材料：
1. 企业营业执照副本（彩色扫描件）
2. 物化探专业资质证书
3. 安全生产许可证（有效期内）
4. 主要物探设备清单
5. 近三年同类项目业绩证明`,S0501000:`请上传以下材料：
1. 企业营业执照副本（彩色扫描件）
2. 科技服务资质证书
3. 研发团队人员资质证明（如有）
4. 近三年科技项目成果证明
5. 质量管理体系认证证书（如有）`};function l(e){const t=c[e];if(t)return t;const n=e.replace(/0+$/,"");return c[n]||""}const r=[{seq:1,type:"系统通知",title:"2026年度服务商考评将于6月15日启动",content:`各位服务商：

2026年度服务商综合考核将于2026年7月1日正式开始，请各服务商提前准备以下材料：

1. 年度服务报告
2. 客户满意度调查表
3. 资质证书更新文件
4. 安全生产记录

请在2026年6月30日前完成材料准备。`,attachments:[],createTime:"2026-06-01 10:00",status:"已发布"},{seq:2,type:"系统通知",title:"服务商注册标签新增ESG管理材料要求",content:`各相关部门、服务商：

根据最新政策要求，服务商注册管理规定已完成修订，新增ESG管理材料要求。新规定自2026年7月1日起施行。`,attachments:[],createTime:"2026-05-28 14:30",status:"已发布"},{seq:3,type:"系统通知",title:"服务商管理平台操作培训（第三期）报名开始",content:`各服务商：

服务商管理平台操作培训（第三期）现已开放报名，请未完成培训的服务商尽快报名参加。`,attachments:[],createTime:"2026-05-25 09:00",status:"已发布"},{seq:4,type:"系统通知",title:"系统将于6月3日凌晨2:00-4:00进行维护升级",content:`各位用户：

系统将于2026年6月3日（周三）02:00-04:00进行维护升级，届时系统将暂停服务。请提前做好相关工作安排。`,attachments:[],createTime:"2026-05-22 16:00",status:"已发布"},{seq:5,type:"操作手册",title:"服务商注册操作手册",content:`本手册详细介绍了服务商注册的完整流程，包括：

1. 账号注册与登录
2. 基础信息填写
3. 服务品类选择
4. 资质文件上传
5. 提交审核`,attachments:[{name:"服务商注册操作手册0618V.pdf",url:"#"}],createTime:"2026-05-20 09:00",status:"已发布"},{seq:6,type:"操作手册",title:"服务商准入操作手册",content:`本手册详细介绍了服务商准入的完整流程，包括：

1. 准入通知查看
2. 补充资料填写
3. 资质文件上传
4. 进度查询`,attachments:[{name:"服务商正式准入操作手册0618V.pdf",url:"#"}],createTime:"2026-05-18 16:00",status:"已发布"},{seq:7,type:"操作手册",title:"服务商日常管理操作手册",content:`本手册详细介绍了服务商日常管理功能，包括：

1. 服务品类维护
2. 信息变更申请
3. 冻结解冻查询
4. 进度查询`,attachments:[{name:"服务商日常管理操作手册0618V.pdf",url:"#"}],createTime:"2026-05-15 10:00",status:"已发布"}];function u(){return r.filter(e=>e.type==="系统通知"&&e.status==="已发布")}function o(){return r.filter(e=>e.type==="操作手册"&&e.status==="已发布")}const d=[{label:"工程技术服务",key:"gc",children:[{label:"钻井工程",key:"gc-zj",code:"S0101000"},{label:"采油工程",key:"gc-cy",code:"S0102000"},{label:"油田技术服务",key:"gc-yc",code:"S0201000"}]},{label:"地面建设服务",key:"dm",children:[{label:"交通工程",key:"dm-jt",code:"S0401000"},{label:"管道工程",key:"dm-gd",children:[{label:"管道安装",key:"dm-gd-az",code:"S0301000"},{label:"管道防腐",key:"dm-gd-ff",code:"S0501000"}]},{label:"电力工程",key:"dm-dl",code:"S0301000"}]},{label:"物业安保服务",key:"wy",code:"S0401000"}],m=(()=>{const e={},t=n=>{for(const a of n)a.code&&(e[a.code]=a.label),a.children&&t(a.children)};return t(d),e})();export{o as a,l as b,i as c,m as d,d as e,u as g,r as s};
