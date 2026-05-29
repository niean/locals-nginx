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

## 卸载

```bash
sudo launchctl bootout system/com.niean.nginx-gateway
sudo rm /Library/LaunchDaemons/com.niean.nginx-gateway.plist
sudo /opt/homebrew/bin/nginx -s stop -c /Users/niean/install/nginx/nginx.conf
```
