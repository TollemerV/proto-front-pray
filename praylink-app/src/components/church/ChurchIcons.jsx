import React from 'react';

/**
 * Consistent SVG Icons for the Church Administration section.
 * Style: strokeWidth 2.2, round caps, 24x24 viewBox.
 */

const IconBase = ({ children, size = 24, stroke = "currentColor", fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const Icons = {
  Announce: (props) => (
    <IconBase {...props}>
      <path d="M18 8a3 3 0 0 0-3-3H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a3 3 0 0 0 3-3V8Z" />
      <path d="m18 8 3.447-1.724A1 1 0 0 1 23 7.17v9.66a1 1 0 0 1-1.553.829L18 16" />
    </IconBase>
  ),
  Calendar: (props) => (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </IconBase>
  ),
  Prayer: (props) => (
    <IconBase {...props}>
      <path d="M12 2a3 3 0 0 1 3 3v2" />
      <path d="M9 7V5a3 3 0 0 1 3-3" />
      <path d="M12 22a7 7 0 0 0 7-7V9a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v6a7 7 0 0 0 7 7Z" />
      <path d="M12 8v4" />
    </IconBase>
  ),
  Message: (props) => (
    <IconBase {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </IconBase>
  ),
  Users: (props) => (
    <IconBase {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  ),
  Wallet: (props) => (
    <IconBase {...props}>
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
      <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
    </IconBase>
  ),
  Alert: (props) => (
    <IconBase {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </IconBase>
  ),
  Stats: (props) => (
    <IconBase {...props}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </IconBase>
  ),
  Activity: (props) => (
    <IconBase {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </IconBase>
  ),
  Check: (props) => (
    <IconBase {...props}>
      <polyline points="20 6 9 17 4 12" />
    </IconBase>
  ),
  Plus: (props) => (
    <IconBase {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </IconBase>
  ),
  ArrowLeft: (props) => (
    <IconBase {...props}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </IconBase>
  ),
  ChevronRight: (props) => (
    <IconBase {...props}>
      <polyline points="9 18 15 12 9 6" />
    </IconBase>
  ),
  X: (props) => (
    <IconBase {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </IconBase>
  ),
  Logout: (props) => (
    <IconBase {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </IconBase>
  ),
  Bell: (props) => (
    <IconBase {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </IconBase>
  ),
  Globe: (props) => (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </IconBase>
  ),
  Home: (props) => (
    <IconBase {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </IconBase>
  )
};
