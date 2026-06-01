(function() {
  'use strict';

  var NAV_ITEMS = [
    { icon: '<svg viewBox="4 4 24 24" fill="none"><path d="M16 7L16 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16 22L16 25" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 16L10 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 16L25 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="16" r="5" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/><path d="M11 11L12.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M19.5 19.5L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 21L12.5 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M19.5 12.5L21 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', title: '助手', path: '/assistant/' },
    { icon: '<svg viewBox="14 18 36 32" fill="none"><path d="M22 24h20a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4Z" fill="currentColor" opacity="0.15"/><path d="M22 24h20a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4Z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M26 21h12a3 3 0 0 1 3 3v2H23v-2a3 3 0 0 1 3-3Z" stroke="currentColor" stroke-width="2" fill="none"/></svg>', title: '工具', path: '/locals/' }
  ];

  var COLLAPSED_WIDTH = 48;
  var EXPANDED_WIDTH = 200;
  var STORAGE_KEY = 'shared-nav-expanded';

  var expanded = localStorage.getItem(STORAGE_KEY) === 'true';

  // Inject CSS
  var style = document.createElement('style');
  style.textContent = [
    '.sn-sidebar {',
    '  position: fixed;',
    '  top: 0;',
    '  left: 0;',
    '  height: 100vh;',
    '  width: ' + COLLAPSED_WIDTH + 'px;',
    '  background: #ffffff;',
    '  border-right: 1px solid #d1d9e0;',
    '  z-index: 99999;',
    '  display: flex;',
    '  flex-direction: column;',
    '  transition: width 0.2s ease;',
    '  overflow: hidden;',
    '  box-shadow: 1px 0 3px rgba(0,0,0,0.04);',
    '}',
    '.sn-sidebar.sn-expanded {',
    '  width: ' + EXPANDED_WIDTH + 'px;',
    '}',
    '.sn-toggle {',
    '  width: 100%;',
    '  height: 48px;',
    '  border: none;',
    '  background: transparent;',
    '  cursor: pointer;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  color: #656d76;',
    '  transition: color 0.15s, background 0.15s;',
    '  flex-shrink: 0;',
    '}',
    '.sn-toggle:hover {',
    '  background: #f6f8fa;',
    '  color: #1f2328;',
    '}',
    '.sn-toggle svg {',
    '  width: 18px;',
    '  height: 18px;',
    '  transition: transform 0.2s ease;',
    '}',
    '.sn-expanded .sn-toggle svg {',
    '  transform: rotate(180deg);',
    '}',
    '.sn-nav {',
    '  padding: 8px 6px;',
    '  display: flex;',
    '  flex-direction: column;',
    '  gap: 2px;',
    '}',
    '.sn-nav:first-of-type {',
    '  flex: 1;',
    '}',
    '.sn-nav-bottom {',
    '  border-top: 1px solid #d1d9e0;',
    '  padding-top: 8px;',
    '  margin-top: auto;',
    '}',
    '.sn-item {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 12px;',
    '  padding: 10px 12px;',
    '  border-radius: 8px;',
    '  text-decoration: none;',
    '  color: #656d76;',
    '  white-space: nowrap;',
    '  transition: background 0.15s, color 0.15s;',
    '}',
    '.sn-item:hover {',
    '  background: #f6f8fa;',
    '  color: #1f2328;',
    '}',
    '.sn-item.sn-active {',
    '  background: #eef6ff;',
    '  color: #0969da;',
    '}',
    '.sn-item svg {',
    '  width: 20px;',
    '  height: 20px;',
    '  flex-shrink: 0;',
    '}',
    '.sn-item span {',
    '  font-size: 14px;',
    '  font-weight: 500;',
    '  opacity: 0;',
    '  transition: opacity 0.15s;',
    '}',
    '.sn-expanded .sn-item span {',
    '  opacity: 1;',
    '}',
    'body {',
    '  transition: padding-left 0.2s ease;',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // Set body padding
  var GAP = 16;
  function updateBodyPadding() {
    document.body.style.paddingLeft = ((expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH) + GAP) + 'px';
  }

  // Determine active item
  var pathname = location.pathname;
  function isActive(itemPath) {
    return pathname.indexOf(itemPath) === 0;
  }

  // Build DOM
  var sidebar = document.createElement('aside');
  sidebar.className = 'sn-sidebar' + (expanded ? ' sn-expanded' : '');

  // Toggle button
  var toggle = document.createElement('button');
  toggle.className = 'sn-toggle';
  toggle.title = '展开/收起导航';
  toggle.innerHTML = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>';
  toggle.addEventListener('click', function() {
    expanded = !expanded;
    localStorage.setItem(STORAGE_KEY, expanded);
    sidebar.classList.toggle('sn-expanded', expanded);
    updateBodyPadding();
  });
  sidebar.appendChild(toggle);

  // Nav items
  var nav = document.createElement('nav');
  nav.className = 'sn-nav';
  NAV_ITEMS.forEach(function(item) {
    var a = document.createElement('a');
    a.className = 'sn-item' + (isActive(item.path) ? ' sn-active' : '');
    a.href = item.path;
    a.innerHTML = item.icon + '<span>' + item.title + '</span>';
    nav.appendChild(a);
  });
  sidebar.appendChild(nav);

  // Bottom nav (Chat - external link)
  var bottomNav = document.createElement('nav');
  bottomNav.className = 'sn-nav sn-nav-bottom';
  var chatLink = document.createElement('a');
  chatLink.className = 'sn-item';
  chatLink.href = 'http://localhost:3000';
  chatLink.target = '_blank';
  chatLink.innerHTML = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-6 0H7v2h2V9z" clip-rule="evenodd"/></svg><span>Chat</span>';
  bottomNav.appendChild(chatLink);
  sidebar.appendChild(bottomNav);

  // Insert into page
  document.body.insertBefore(sidebar, document.body.firstChild);
  updateBodyPadding();
})();
