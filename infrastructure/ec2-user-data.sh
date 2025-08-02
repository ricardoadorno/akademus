#!/bin/bash
set -e

# Update system
apt-get update -y
apt-get install -y docker.io nginx git curl

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Start Docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ubuntu

# Configure Nginx
systemctl start nginx
systemctl enable nginx

# Create directory for application
mkdir -p /home/ubuntu/akademus-api
chown ubuntu:ubuntu /home/ubuntu/akademus-api
cd /home/ubuntu/akademus-api

# Copy Nginx configuration
cat > /etc/nginx/conf.d/api.conf << 'EOF'
server {
    listen 80;
    server_name _;

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /health {
        proxy_pass http://localhost:3000/health;
        access_log off;
    }
}
EOF

# Test and restart nginx
nginx -t && systemctl restart nginx

# Create logs directory
mkdir -p logs
chown ubuntu:ubuntu logs

echo "✅ EC2 setup completed successfully!"
