import React, { ReactNode } from 'react';
import { Tooltip } from 'antd';

type Props = {
  label: ReactNode;
  tip?: ReactNode;
  className?: string;
};

export  function SubHeader({ label, tip, className }: Props) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        margin: '8px 0 2px',
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 2 }}>
        {label}
      </span>
      {tip ? (
        <Tooltip title={tip} placement="right">
          <span
            aria-label="info"
            style={{
              display: 'inline-flex',
              width: 14,
              height: 14,
              borderRadius: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 11,
              lineHeight: '14px',
              userSelect: 'none',
              cursor: 'help',
              border: '1px solid currentColor',
              opacity: 0.85,
            }}
          >
            i
          </span>
        </Tooltip>
      ) : null}
    </div>
  );
}
