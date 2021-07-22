import React, { ChangeEvent } from 'react';
import ConfigProvider from '../configProvider';

import "./switch.scss";

interface SwitchProps {
  label: string | React.ReactNode,
  name: "enabled" | "mute_silence" | "is_bar_icon_enabled" | "allow_analytics" | "dynamic_silence_threshold",
  config: ConfigProvider,
  plusDisabled?: boolean,
  openPlusPopup?: () => void,
  info?: React.ReactNode,
}

const Switch = ({ label, name, config, plusDisabled, openPlusPopup, info } : SwitchProps) => {
  return (
    <div className="switch bottom-border">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>{label}</label>
        {info || null}
      </div>
      <input id={name} type="checkbox" className="switch" checked={config.get(name)} onChange={(evt) => {
        if (plusDisabled) {
          if (openPlusPopup) {
            openPlusPopup();
          }
          return;
        }

        config.set(name, evt.target.checked);

        if (config.env === "popup") {
          window.sa_event(`setting_${name}_${evt.target.checked ? 'enable' : 'disable'}`);
          window.plausible('setting_change', { props: { type: `${name}:${evt.target.checked ? 'enable' : 'disable'}` } });
        }
      }} />
    </div>
  );
};

export default Switch;
