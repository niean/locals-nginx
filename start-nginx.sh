#!/bin/bash
# start-nginx.sh - 启动 nginx 网关服务

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CONF_FILE="$SCRIPT_DIR/nginx.conf"
LOG_DIR="$SCRIPT_DIR/logs"
NGINX_BIN="/opt/homebrew/bin/nginx"

mkdir -p "$LOG_DIR"

# 检查 nginx 是否存在
if [ ! -x "$NGINX_BIN" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Error: nginx not found at $NGINX_BIN, run: brew install nginx" >> "$LOG_DIR/error.log"
    exit 1
fi

# 检查端口是否被占用
if lsof -i :80 > /dev/null 2>&1; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Error: Port 80 is already in use" >> "$LOG_DIR/error.log"
    exit 1
fi

# 前台运行（由 launchd 管理）
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting nginx gateway on port 80" >> "$LOG_DIR/access.log"
exec "$NGINX_BIN" -c "$CONF_FILE" -g 'daemon off;'
