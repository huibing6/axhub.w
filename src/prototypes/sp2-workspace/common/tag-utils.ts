/**
 * @name 服务商标签工具
 * 提供根据标签配置计算服务商标签的功能
 */

export interface TagConfig {
  id: string;
  name: string;
  color: string;
  level: 'L1' | 'L2';
  enabled: boolean;
  description?: string;
  rule: {
    type: 'status' | 'integration';
    statusValue?: 'qualified' | 'formal' | 'pending' | 'frozen';
    integrationSystemId?: string;
  };
}

export interface TagItem {
  name: string;
  color: string;
  level: 'L1' | 'L2';
}

/** 集成系统配置（从 config-thirdparty 同步） */
const integrationSystems = [
  { id: 'ZJGC', name: '钻井工程资质管理系统' },
  { id: 'WHT-FW', name: '物化探服务管理系统' },
  { id: 'GC-001', name: '承包商管理系统' },
  { id: 'EISC-001', name: 'EISC管理系统' },
];

/** 品类与集成系统关联配置（从专业类型管理同步） */
const categoryIntegrationMap: Record<string, string> = {
  'S0101000': 'ZJGC',
  'S0102000': 'ZJGC',
  'S0201000': 'WHT-FW',
  'S0401000': 'EISC-001',
  'S0301000': 'EISC-001',
};

/** 默认标签配置（实际应从 config-tag 页面读取） */
export const defaultTagConfigs: TagConfig[] = [
  {
    id: '1',
    name: '正式服务商',
    color: 'blue',
    level: 'L1',
    enabled: true,
    rule: { type: 'status', statusValue: 'formal' },
  },
  {
    id: '2',
    name: '合格服务商',
    color: 'green',
    level: 'L1',
    enabled: true,
    rule: { type: 'status', statusValue: 'qualified' },
  },
  {
    id: '3',
    name: '承包商',
    color: 'orange',
    level: 'L2',
    enabled: true,
    rule: { type: 'integration', integrationSystemId: 'GC-001' },
  },
  {
    id: '4',
    name: 'EISC',
    color: 'purple',
    level: 'L2',
    enabled: true,
    rule: { type: 'integration', integrationSystemId: 'EISC-001' },
  },
  {
    id: '5',
    name: '钻井工程资质管理系统',
    color: 'cyan',
    level: 'L2',
    enabled: true,
    rule: { type: 'integration', integrationSystemId: 'ZJGC' },
  },
  {
    id: '6',
    name: '物化探服务管理系统',
    color: 'cyan',
    level: 'L2',
    enabled: true,
    rule: { type: 'integration', integrationSystemId: 'WHT-FW' },
  },
];

/**
 * 根据服务商状态和品类列表计算标签
 * @param status 服务商准入状态
 * @param categoryCodes 服务商注册的品类编码列表
 * @param tagConfigs 标签配置列表（可选，默认使用 defaultTagConfigs）
 * @returns 匹配的标签列表
 */
export function calculateServiceTags(
  status: string,
  categoryCodes: string[],
  tagConfigs: TagConfig[] = defaultTagConfigs,
): TagItem[] {
  const matchedTags: TagItem[] = [];

  for (const tag of tagConfigs) {
    if (!tag.enabled) continue;

    if (tag.rule.type === 'status') {
      if (status === tag.rule.statusValue) {
        matchedTags.push({ name: tag.name, color: tag.color, level: tag.level });
      }
    }

    if (tag.rule.type === 'integration') {
      const systemId = tag.rule.integrationSystemId;
      for (const code of categoryCodes) {
        if (categoryIntegrationMap[code] === systemId) {
          matchedTags.push({ name: tag.name, color: tag.color, level: tag.level });
          break;
        }
      }
    }
  }

  return matchedTags;
}
