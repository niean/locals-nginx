(function() {
  'use strict';

  var NAV_ITEMS = [
    {
      icon: '<svg viewBox="4 4 24 24" fill="none"><path d="M16 7L16 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16 22L16 25" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 16L10 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 16L25 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="16" r="5" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/><path d="M11 11L12.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M19.5 19.5L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 21L12.5 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M19.5 12.5L21 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
      title: '助手',
      path: '/assistant/',
      children: [
        { title: 'Overview', hash: '' },
        { separator: true },
        { title: 'Cron Jobs', hash: 'cron' },
        { title: 'Sessions', hash: 'sessions' },
        { separator: true },
        { title: 'MCP', hash: 'mcp' },
        { title: 'Skills', hash: 'skills' },
        { title: 'Plugins', hash: 'plugins' }
      ]
    },
    {
      icon: '<svg viewBox="14 18 36 32" fill="none"><path d="M22 24h20a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4Z" fill="currentColor" opacity="0.15"/><path d="M22 24h20a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4Z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M26 21h12a3 3 0 0 1 3 3v2H23v-2a3 3 0 0 1 3-3Z" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
      title: '工具',
      path: '/tools/',
      children: [
        { title: 'Photo Editor', href: '/tools/photo-editor/' },
        { title: 'MDer', href: '/tools/mder/' },
        { title: 'Iframer', href: '/tools/iframer/' }
      ]
    }
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
    '  overflow: visible;',
    '  box-shadow: 1px 0 3px rgba(0,0,0,0.04);',
    '}',
    '.sn-sidebar.sn-expanded {',
    '  width: ' + EXPANDED_WIDTH + 'px;',
    '  overflow: hidden;',
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
    '/* Nav item wrapper for positioning popover */',
    '.sn-item-wrap {',
    '  position: relative;',
    '}',
    '.sn-item {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 12px;',
    '  padding: 10px 8px;',
    '  border-radius: 8px;',
    '  text-decoration: none;',
    '  color: #656d76;',
    '  white-space: nowrap;',
    '  transition: background 0.15s, color 0.15s;',
    '  cursor: pointer;',
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
    '/* Inline children (expanded mode) */',
    '.sn-children {',
    '  display: none;',
    '  flex-direction: column;',
    '  gap: 1px;',
    '  padding: 2px 0 2px 32px;',
    '  overflow: hidden;',
    '}',
    '.sn-expanded .sn-children.sn-children-open {',
    '  display: flex;',
    '}',
    '.sn-child {',
    '  display: block;',
    '  padding: 6px 12px;',
    '  border-radius: 6px;',
    '  text-decoration: none;',
    '  color: #656d76;',
    '  font-size: 13px;',
    '  font-weight: 500;',
    '  white-space: nowrap;',
    '  transition: background 0.15s, color 0.15s;',
    '  cursor: pointer;',
    '}',
    '.sn-child:hover {',
    '  background: #f6f8fa;',
    '  color: #1f2328;',
    '}',
    '.sn-child.sn-active {',
    '  background: #eef6ff;',
    '  color: #0969da;',
    '  font-weight: 600;',
    '}',
    '/* Popover (collapsed mode) */',
    '.sn-popover {',
    '  display: none;',
    '  position: absolute;',
    '  left: 100%;',
    '  top: 0;',
    '  margin-left: 4px;',
    '  background: #ffffff;',
    '  border: 1px solid #d1d9e0;',
    '  border-radius: 8px;',
    '  box-shadow: 0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06);',
    '  padding: 6px 0;',
    '  min-width: 140px;',
    '  z-index: 100000;',
    '}',
    '.sn-item-wrap:hover .sn-popover:not(.sn-popover-hidden) {',
    '  display: block;',
    '}',
    '.sn-expanded .sn-popover {',
    '  display: none !important;',
    '}',
    '.sn-popover-item {',
    '  display: block;',
    '  padding: 10px 20px;',
    '  text-decoration: none;',
    '  color: #1f2328;',
    '  font-size: 14px;',
    '  font-weight: 400;',
    '  white-space: nowrap;',
    '  transition: background 0.12s;',
    '  cursor: pointer;',
    '}',
    '.sn-popover-item:hover {',
    '  background: #f6f8fa;',
    '}',
    '.sn-popover-item.sn-active {',
    '  color: #0969da;',
    '  font-weight: 500;',
    '}',
    '.sn-popover-sep {',
    '  height: 1px;',
    '  background: #eaeef2;',
    '  margin: 4px 12px;',
    '}',
    '.sn-children-sep {',
    '  height: 1px;',
    '  background: #eaeef2;',
    '  margin: 4px 0;',
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
    var hasChildren = item.children && item.children.length > 0;
    var active = isActive(item.path);
    var currentHash = location.hash.replace('#', '');

    if (hasChildren) {
      // Wrapper for positioning popover
      var wrap = document.createElement('div');
      wrap.className = 'sn-item-wrap';

      var a = document.createElement('a');
      a.className = 'sn-item' + (active ? ' sn-active' : '');
      a.href = item.path;
      a.innerHTML = item.icon + '<span>' + item.title + '</span>';

      // In expanded mode: toggle inline children; collapsed mode: navigate
      a.addEventListener('click', function(e) {
        if (expanded) {
          e.preventDefault();
          var childrenEl = wrap.querySelector('.sn-children');
          if (childrenEl) childrenEl.classList.toggle('sn-children-open');
        }
      });
      wrap.appendChild(a);

      // Popover (for collapsed mode)
      var popover = document.createElement('div');
      popover.className = 'sn-popover';
      item.children.forEach(function(child) {
        if (child.separator) {
          var sep = document.createElement('div');
          sep.className = 'sn-popover-sep';
          popover.appendChild(sep);
          return;
        }
        var pItem = document.createElement('a');
        pItem.className = 'sn-popover-item';
        // href-based child (cross-page link) vs hash-based child (same-page tab)
        var childHref = child.href || (item.path + (child.hash ? '#' + child.hash : ''));
        pItem.href = childHref;
        pItem.textContent = child.title;

        if (child.hash !== undefined) {
          pItem.setAttribute('data-sn-tab', child.hash || 'overview');
          if (active && (currentHash === child.hash || (!currentHash && child.hash === ''))) {
            pItem.classList.add('sn-active');
          }
        } else if (child.href && pathname.indexOf(child.href) === 0) {
          pItem.classList.add('sn-active');
        }

        pItem.addEventListener('click', function(e) {
          if (child.hash !== undefined && active) {
            e.preventDefault();
            location.hash = child.hash || '';
            popover.querySelectorAll('.sn-popover-item').forEach(function(c) { c.classList.remove('sn-active'); });
            pItem.classList.add('sn-active');
            if (window.switchTab) window.switchTab(child.hash || 'overview', false);
          }
          // Hide popover after click
          popover.classList.add('sn-popover-hidden');
          setTimeout(function() { popover.classList.remove('sn-popover-hidden'); }, 300);
        });
        popover.appendChild(pItem);
      });
      wrap.appendChild(popover);

      // Inline children (for expanded mode)
      var childrenDiv = document.createElement('div');
      childrenDiv.className = 'sn-children' + (active ? ' sn-children-open' : '');

      item.children.forEach(function(child) {
        if (child.separator) {
          var sep = document.createElement('div');
          sep.className = 'sn-children-sep';
          childrenDiv.appendChild(sep);
          return;
        }
        var childEl = document.createElement('a');
        childEl.className = 'sn-child';
        var childHref = child.href || (item.path + (child.hash ? '#' + child.hash : ''));
        childEl.href = childHref;
        childEl.textContent = child.title;

        if (child.hash !== undefined) {
          childEl.setAttribute('data-sn-tab', child.hash || 'overview');
          if (active && (currentHash === child.hash || (!currentHash && child.hash === ''))) {
            childEl.classList.add('sn-active');
          }
        } else if (child.href && pathname.indexOf(child.href) === 0) {
          childEl.classList.add('sn-active');
        }

        childEl.addEventListener('click', function(e) {
          if (child.hash !== undefined && active) {
            e.preventDefault();
            location.hash = child.hash || '';
            childrenDiv.querySelectorAll('.sn-child').forEach(function(c) { c.classList.remove('sn-active'); });
            childEl.classList.add('sn-active');
            // Sync popover active state
            popover.querySelectorAll('.sn-popover-item').forEach(function(c) { c.classList.remove('sn-active'); });
            var matchPopItem = popover.querySelector('[data-sn-tab="' + (child.hash || 'overview') + '"]');
            if (matchPopItem) matchPopItem.classList.add('sn-active');
            if (window.switchTab) window.switchTab(child.hash || 'overview', false);
          }
          // href-based children: allow normal navigation
        });

        childrenDiv.appendChild(childEl);
      });
      wrap.appendChild(childrenDiv);

      nav.appendChild(wrap);
    } else {
      // Simple item without children
      var a = document.createElement('a');
      a.className = 'sn-item' + (active ? ' sn-active' : '');
      a.href = item.path;
      a.innerHTML = item.icon + '<span>' + item.title + '</span>';
      nav.appendChild(a);
    }
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

  // Listen for hashchange to update active states (inline children + popover)
  window.addEventListener('hashchange', function() {
    var hash = location.hash.replace('#', '');
    var tab = hash || 'overview';
    sidebar.querySelectorAll('.sn-child').forEach(function(c) {
      c.classList.toggle('sn-active', c.getAttribute('data-sn-tab') === tab);
    });
    sidebar.querySelectorAll('.sn-popover-item').forEach(function(c) {
      c.classList.toggle('sn-active', c.getAttribute('data-sn-tab') === tab);
    });
  });
})();
