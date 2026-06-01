# Nginx 网关安装

## 安装

```bash
# 安装 nginx
brew install nginx

# 启动 nginx（监听 80 端口，需要 root）
sudo /opt/homebrew/bin/nginx -c /Users/niean/install/nginx/nginx.conf
```

## 常用命令

```bash
# 重载配置
sudo /opt/homebrew/bin/nginx -s reload -c /Users/niean/install/nginx/nginx.conf

# 停止
sudo /opt/homebrew/bin/nginx -s stop -c /Users/niean/install/nginx/nginx.conf

# 验证配置语法
/opt/homebrew/bin/nginx -t -c /Users/niean/install/nginx/nginx.conf
```

## 开机自启（可选）

```bash
# 安装 LaunchDaemon
sudo cp /Users/niean/install/nginx/com.niean.nginx-gateway.plist /Library/LaunchDaemons/
sudo chown root:wheel /Library/LaunchDaemons/com.niean.nginx-gateway.plist
sudo launchctl bootstrap system /Library/LaunchDaemons/com.niean.nginx-gateway.plist
```

## Open WebUI (Hermes Chat)

```bash
# 首次启动（拉取镜像 + 启动容器）
cd /Users/niean/install/open-webui
# 编辑 .env 填入 Hermes API Key
docker compose up -d

# 停止
docker compose down

# 查看日志
docker compose logs -f
```

配置目录: `/Users/niean/install/open-webui/`
数据持久化: `/Users/niean/install/open-webui/data/`
访问地址: `http://localhost/chat/` (通过 nginx) 或 `http://localhost:3000` (直连)

首次访问需要创建管理员账号。在 Admin Settings > Connections 中确认 OpenAI API 连接指向 `http://host.docker.internal:8642/v1`。

## 卸载

```bash
sudo launchctl bootout system/com.niean.nginx-gateway
sudo rm /Library/LaunchDaemons/com.niean.nginx-gateway.plist
sudo /opt/homebrew/bin/nginx -s stop -c /Users/niean/install/nginx/nginx.conf
```
