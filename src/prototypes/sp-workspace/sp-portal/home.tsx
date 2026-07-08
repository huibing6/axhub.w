/**
 * @name 入口-企业中心首页
 */
import { theme, Button, Input, Row, Col, Typography, Space, message } from 'antd';

export default function SpHome() {
  const { token: t } = theme.useToken();
  const leftMenu = [
    { label: '企业中心首页', active: true },
    { label: '资产总览' },
    { label: '账户资金管理' },
    { label: '店铺管理', expandable: true },
    { label: '企业管理', expandable: true },
    { label: '消息管理', expandable: true },
    { label: '店群管理', expandable: true },
    { label: '权限管理', expandable: true },
    { label: '增值服务', expandable: true },
    { label: '商旅管理', expandable: true },
    { label: '数据分析', expandable: true },
    { label: '物流大厅', expandable: true },
  ];

  return (
    <div className="min-h-screen" style={{ background: t.colorBgLayout }}>
      <header className="h-14 flex items-center px-6 gap-4" style={{ background: t.colorBgContainer, borderBottom: `1px solid ${t.colorBorderSecondary}` }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: t.colorPrimary }}>
            <span className="text-white text-xs font-bold">雪</span>
          </div>
          <span className="text-sm font-bold" style={{ color: t.colorText }}>云梦泽</span>
        </div>
        <Button type="primary" style={{ borderRadius: 4 }}>企业中心</Button>
        <Space size={4} className="ml-2">
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#52c41a', color: '#fff' }}>中</span>
          <Typography.Text style={{ color: t.colorText, fontSize: 14 }}>天津市金桥焊材集团股份有限公司 1</Typography.Text>
        </Space>
      </header>

      <div className="flex">
        <aside className="w-52 min-h-[calc(100vh-56px)]" style={{ background: t.colorBgContainer, borderRight: `1px solid ${t.colorBorderSecondary}` }}>
          <div className="p-3">
            <Input placeholder="输入查询内容" size="small" />
          </div>
          <div className="mt-1">
            {leftMenu.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer"
                style={item.active ? { color: t.colorPrimary, borderLeft: `3px solid ${t.colorPrimary}`, fontWeight: 'bold', background: t.colorPrimaryBg } : { color: t.colorText }}>
                <span>{item.label}</span>
                {item.expandable && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: t.colorTextQuaternary }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                )}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: t.colorTextSecondary }}>
            <span>企业中心首页</span>
            <span style={{ color: t.colorTextQuaternary }}>×</span>
          </div>
          <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 24 }}>入驻特色业务</Typography.Title>
          <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>采购与招标业务</Typography.Title>
          <Row gutter={16} style={{ marginBottom: 32 }}>
            <Col span={8}>
              <div className="rounded p-5" style={{ background: t.colorBgContainer, border: `1px solid ${t.colorBorderSecondary}`, height: '100%' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" style={{ color: t.colorPrimary }}>◉</span>
                  <span className="font-bold" style={{ color: t.colorText }}>成为中石油供应商</span>
                </div>
                <p className="text-sm mb-3" style={{ color: t.colorTextSecondary }}>向中石油内部采购人提供服务</p>
                <p className="text-xs mb-4" style={{ color: t.colorTextTertiary }}>需要资质：营业执照、法人证明等</p>
                <Button type="default" style={{ borderColor: t.colorPrimary, color: t.colorPrimary }} onClick={() => window.location.hash = '#/sp/workspace'}>进入供应商管理端</Button>
              </div>
            </Col>
            <Col span={8}>
              <div className="rounded p-5" style={{ background: t.colorBgContainer, border: `1px solid ${t.colorBorderSecondary}`, height: '100%' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" style={{ color: t.colorTextSecondary }}>📢</span>
                  <span className="font-bold" style={{ color: t.colorText }}>成为投标人</span>
                </div>
                <p className="text-sm mb-3" style={{ color: t.colorTextSecondary }}>为参与投标活动的企业和个人提供信息认证和审核服务</p>
                <p className="text-xs mb-4" style={{ color: t.colorTextTertiary }}>需要资质：营业执照、银行基本户开户许可证及相关企业资质证书证明等</p>
                <Button type="default" style={{ borderColor: t.colorPrimary, color: t.colorPrimary }} onClick={() => message.info('认证申请功能待开放')}>申请认证</Button>
              </div>
            </Col>
            <Col span={8}>
              <div className="rounded p-5" style={{ background: t.colorBgContainer, border: `1px solid ${t.colorBorderSecondary}`, height: '100%' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" style={{ color: t.colorTextSecondary }}>📋</span>
                  <span className="font-bold" style={{ color: t.colorText }}>成为招标人</span>
                </div>
                <p className="text-sm mb-3" style={{ color: t.colorTextSecondary }}>为开展采购与招标活动的企业提供综合服务</p>
                <p className="text-xs mb-4" style={{ color: t.colorTextTertiary }}>需要资质：营业执照</p>
                <Button disabled style={{ background: t.colorBgLayout, color: t.colorTextQuaternary }}>建设中</Button>
              </div>
            </Col>
            <Col span={8}>
              <div className="rounded p-5" style={{ background: t.colorBgContainer, border: `1px solid ${t.colorBorderSecondary}`, height: '100%' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" style={{ color: t.colorTextSecondary }}>👥</span>
                  <span className="font-bold" style={{ color: t.colorText }}>专家认证</span>
                </div>
                <p className="text-sm mb-3" style={{ color: t.colorTextSecondary }}>认证成为化销企业内部专家，成招标业务评标专家开展工单业务及评标业务</p>
                <Button disabled style={{ background: t.colorBgLayout, color: t.colorTextQuaternary, marginTop: 24 }}>建设中</Button>
              </div>
            </Col>
            <Col span={8}>
              <div className="rounded p-5" style={{ background: t.colorBgContainer, border: `1px solid ${t.colorBorderSecondary}`, height: '100%' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" style={{ color: t.colorPrimary }}>◉</span>
                  <span className="font-bold" style={{ color: t.colorText }}>成为中石油服务商</span>
                </div>
                <p className="text-sm mb-3" style={{ color: t.colorTextSecondary }}>提供除工程和物资以外的服务商</p>
                <p className="text-xs mb-4" style={{ color: t.colorTextTertiary }}>需要资质：营业执照、专业资质证书、财务审计报告/银行资信证明、QHSE/ESG 无重大事故事件承诺、无重大违法违规承诺、信用信息合规等</p>
                <Button type="default" style={{ borderColor: t.colorPrimary, color: t.colorPrimary }} onClick={() => window.location.hash = '#/sp/workspace'}>进入服务商管理端</Button>
              </div>
            </Col>
          </Row>

          <Typography.Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>批发业务</Typography.Title>
        </main>
      </div>
    </div>
  );
}
