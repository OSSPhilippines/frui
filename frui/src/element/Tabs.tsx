import type { ReactNode, CSSProperties } from 'react';
import { useState } from 'react';

export type TabProps = {
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  vertical?: boolean;
};

export type TabPanelProps = {
  children: ReactNode;
  isActive?: boolean;
  style?: CSSProperties;
  className?: string;
};

export type TabsProps = {
  tabs: TabProps[];
  panels: ReactNode[];
  vertical?: boolean;
  scrollable?: boolean;
  centered?: boolean;
  fullWidth?: boolean;
  wrap?: boolean;
};

export default function Tabs(props: TabsProps) {
  const {
    tabs,
    panels,
    vertical = false,
    scrollable = false,
    centered = false,
    fullWidth = false,
    wrap = false,
  } = props;

  const [activeTab, setActiveTab] = useState(0);

  const tabListClass = `frui-tab-list 
  ${vertical ? 'frui-tab-list-vertical' : ''} 
  ${scrollable ? 'frui-tab-list-scrollable' : ''} 
  ${centered ? 'frui-tab-list-centered' : ''} 
  ${!vertical && fullWidth ? 'frui-tab-list-fullwidth' : ''}`;

  return (
    <div className={`frui-tabs ${wrap ? 'wrap' : ''} ${vertical ? 'frui-tabs-vertical' : ''}`}>
      <div className="frui-tab-container">
        <div className={tabListClass}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              disabled={tab.disabled}
              isActive={activeTab === index}
              onClick={() => setActiveTab(index)}
              style={tab.style}
              className={tab.className}
              vertical={vertical}
            />
          ))}
        </div>
        <div className="frui-tab-panels">
          {panels.map((panel, index) => (
            <TabPanel key={index} isActive={activeTab === index}>
              {panel}
            </TabPanel>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tab({ label, icon, disabled, isActive, onClick, style, className, vertical }: TabProps) {
  const tabClass = `frui-tab ${isActive ? 'frui-tab-active' : ''} ${disabled ? 'frui-tab-disabled' : ''} 
                    ${vertical ? 'frui-tab-vertical' : ''} ${className || ''}`;
  const iconClass = `frui-tab-icon ${icon ? 'frui-tab-icon-show' : ''}`;

  return (
    <div className={tabClass} style={style} onClick={disabled ? undefined : onClick}>
      {icon && <span className={iconClass}>{icon}</span>}
      <span className="frui-tab-label">{label}</span>
    </div>
  );
}

function TabPanel({ children, isActive, style, className }: TabPanelProps) {
  const panelClass = `frui-tab-panel ${isActive ? 'frui-tab-panel-active' : ''} ${className || ''}`;

  return (
    <div className={panelClass} style={style}>
      {children}
    </div>
  );
}
