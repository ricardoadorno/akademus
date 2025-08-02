# 🚀 Akademus AWS Deploy

Deploy completo do **Akademus** na AWS usando EC2 + Docker para API e S3 + CloudFront para Frontend.

## 📋 Pré-requisitos

### 1. Recursos AWS

- **EC2 Instance**: t3.micro com user-data script
- **RDS PostgreSQL**: Database para a API
- **S3 Bucket**: `akademus-web-bucket` para frontend
- **CloudFront**: Distribution para CDN

### 2. GitHub Secrets

Configure os seguintes secrets no repositório:

```bash
# AWS Credentials (apenas para S3/CloudFront)
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# Database
DATABASE_URL=postgresql://user:password@your-rds-endpoint:5432/akademus
JWT_SECRET=your-super-secret-jwt-key

# Frontend
VITE_API_URL=https://your-api-domain.com

# AWS Resources
CLOUDFRONT_DISTRIBUTION_ID=E1234567890123
EC2_HOST=ec2-xx-xx-xx-xx.region.compute.amazonaws.com
EC2_SSH_KEY=|
  -----BEGIN OPENSSH PRIVATE KEY-----
  your-private-key-content
  -----END OPENSSH PRIVATE KEY-----
```

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CloudFront    │    │      EC2        │    │   RDS Postgres  │
│   (Frontend)    │    │   + Nginx       │    │   (Database)    │
│                 │    │   + Docker      │    │                 │
│  S3 Bucket      │    │   + Git Clone   │    │                 │
│  Static Files   │    │   + Local Build │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘

Fluxo de Deploy:
1. Push para GitHub → Trigger Actions
2. SSH para EC2 → Git clone/pull
3. Docker build local → Deploy container
4. Nginx proxy → API disponível

### ✅ Vantagens desta Abordagem:
- **Sem custos extras**: Não precisa de ECR
- **Simplicidade**: Build direto no EC2
- **Controle total**: Código sempre atualizado via Git
- **Debug fácil**: Logs e containers locais
- **Baixa latência**: Sem pull de registry externos
```

## 🚀 Deploy

### Automático (GitHub Actions)

1. **Deploy da API**:

   ```bash
   # Push para main com mudanças em apps/api/
   git add apps/api/
   git commit -m "feat: update api"
   git push origin main
   ```

2. **Deploy do Frontend**:

   ```bash
   # Push para main com mudanças em apps/web/
   git add apps/web/
   git commit -m "feat: update frontend"
   git push origin main
   ```

3. **Deploy Completo (Manual)**:
   - Vá para **Actions** no GitHub
   - Execute o workflow **"Deploy Full Stack"**
   - Escolha quais componentes deployar

### Manual (Local)

#### API

```bash
cd apps/api
npm run build:docker
# Configure .env no EC2
# Execute docker-compose no EC2
```

#### Frontend

```bash
cd apps/web
npm run deploy
```

## 📁 Estrutura de Arquivos

```
akademus/
├── .github/workflows/
│   ├── deploy-api.yml           # Deploy automático da API
│   ├── deploy-frontend.yml      # Deploy automático do Frontend
│   └── deploy-full-stack.yml    # Deploy manual completo
├── apps/
│   ├── api/
│   │   ├── Dockerfile           # Multi-stage build da API
│   │   └── package.json         # Scripts de deploy
│   └── web/
│       └── package.json         # Scripts de deploy S3
└── infrastructure/
    ├── docker-compose.prod.yml  # Configuração de produção
    └── ec2-user-data.sh         # Script de inicialização EC2
```

## 🔧 Configuração EC2

### User Data Script

O script `ec2-user-data.sh` automaticamente:

- ✅ Instala Docker, Docker Compose, Git
- ✅ Configura Nginx como reverse proxy
- ✅ Cria estrutura de diretórios
- ✅ Configura security headers
- ✅ Health check endpoint

### Security Group

```bash
# Inbound Rules
HTTP  (80)   - 0.0.0.0/0
HTTPS (443)  - 0.0.0.0/0
SSH   (22)   - Your IP
```

## 🏥 Health Checks

### API

```bash
curl -f http://your-api-domain.com/health
```

### Frontend

```bash
curl -f https://your-frontend-domain.com
```

## 📊 Monitoramento

### Logs da API

```bash
# No EC2
cd /home/ec2-user/akademus-api
docker-compose logs -f
```

### CloudWatch

- EC2 metrics automáticos
- Application Load Balancer logs
- CloudFront access logs

## 🐛 Troubleshooting

### API não inicia

```bash
# SSH no EC2 e verificar logs
ssh -i your-key.pem ec2-user@your-ec2-ip
cd /home/ec2-user/akademus-api
docker-compose logs akademus-api

# Verificar se a imagem foi criada
docker images | grep akademus-api

# Verificar health local
curl http://localhost:3000/health

# Verificar environment
cat .env

# Rebuild manual se necessário
docker build -t akademus-api:latest .
docker-compose up -d
```

### Deploy falha no GitHub Actions

```bash
# Verificar conectividade SSH
ssh -i your-key.pem ec2-user@your-ec2-ip "echo 'Connection OK'"

# Verificar permissões de escrita
ssh -i your-key.pem ec2-user@your-ec2-ip "ls -la /home/ec2-user/"

# Verificar se Git está instalado
ssh -i your-key.pem ec2-user@your-ec2-ip "git --version"
```

### Frontend não carrega

```bash
# Verificar build
npm run build

# Verificar S3 sync
aws s3 ls s3://akademus-web-bucket

# Invalidar CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## 📈 Próximos Passos

- [ ] SSL/TLS com Let's Encrypt
- [ ] Auto Scaling Groups
- [ ] CloudWatch Alarms
- [ ] Blue/Green Deployment
- [ ] Database backups automáticos
- [ ] CDN cache optimization

---

## 🤝 Contribuição

Para deployar suas mudanças:

1. Faça suas alterações
2. Commit e push para `main`
3. GitHub Actions fará o deploy automaticamente
4. Verifique os health endpoints

**Happy Deploying! 🚀**
