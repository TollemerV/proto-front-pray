import React from 'react';

/**
 * Global SVG Icons for the app.
 * Style: strokeWidth 1.6, round caps, 24x24 viewBox — flat & refined.
 */

const IconBase = ({ 
  children, 
  size = 24, 
  stroke = "currentColor", 
  fill = "none", 
  className = "",
  strokeWidth = "1.6",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export const AppIcons = {

  // Praying hands — flat SVG
  Prayer: ({ size = 24, stroke = "currentColor", fill = "none", className = "", strokeWidth }) => (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill={fill} stroke={stroke} strokeWidth={strokeWidth || 1.6}
      strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <path d="M9 5C9 4 8 3 7 3.5L4 7C3 8.5 3 10 3 11.5L3 16C3 18.5 5 20 7 20L12 20" />
      <path d="M15 5C15 4 16 3 17 3.5L20 7C21 8.5 21 10 21 11.5L21 16C21 18.5 19 20 17 20L12 20" />
      <path d="M12 20L12 10" />
      <path d="M9 9L12 6L15 9" />
    </svg>
  ),

  // Arrow Left
  ArrowLeft: ({ size = 24, stroke = "currentColor", fill = "none", className = "", strokeWidth }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth || 1.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 12H5" /><path d="m12 5-7 7 7 7" />
    </svg>
  ),

  // Check
  Check: ({ size = 24, stroke = "currentColor", fill = "none", className = "", strokeWidth }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),

  // Comment — speech bubble
  Comment: (props) => (
    <IconBase {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </IconBase>
  ),

  // Repost — cycling arrows (Twitter/X style)
  Repost: (props) => (
    <IconBase {...props}>
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </IconBase>
  ),

  // Share — paper plane
  Share: (props) => (
    <IconBase {...props}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </IconBase>
  ),

  // Bookmark — save
  Bookmark: (props) => (
    <IconBase {...props}>
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </IconBase>
  ),

  // User / Profile
  User: (props) => (
    <IconBase {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </IconBase>
  ),

  // More (3 dots)
  More: (props) => (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </IconBase>
  ),
};
