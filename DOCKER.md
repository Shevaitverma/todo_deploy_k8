# Docker Setup for Todo Application

This document explains how to run the Todo application using Docker and Docker Compose.

## 🐳 Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## 🚀 Quick Start

### Development Environment

1. **Clone the repository and navigate to the project root:**
   ```bash
   cd todo-application
   ```

2. **Start all services:**
   ```bash
   docker-compose up
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

### Production Environment

1. **Set environment variables (optional):**
   ```bash
   export MONGO_PASSWORD=your_secure_password
   ```

2. **Start production services:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## 📁 Project Structure

```
todo-application/
├── client/
│   ├── Dockerfile
│   └── .dockerignore
├── server/
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml          # Development setup
├── docker-compose.prod.yml     # Production setup
└── DOCKER.md                   # This file
```

## 🔧 Services

### 1. MongoDB Database
- **Image:** mongo:7.0
- **Port:** 27017
- **Credentials:** admin/password123 (development)
- **Database:** todo-app
- **Volume:** mongodb_data (persistent data)

### 2. Backend Server
- **Port:** 5000
- **Environment:** Node.js 18 Alpine
- **Features:** Hot reload in development
- **API Endpoints:** http://localhost:5000/api

### 3. Frontend Client
- **Port:** 3000
- **Environment:** Next.js with TypeScript
- **Features:** Hot reload in development
- **UI:** http://localhost:3000

## 🛠️ Docker Commands

### Development Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs server
docker-compose logs client
docker-compose logs mongodb

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild services
docker-compose build

# Rebuild specific service
docker-compose build server
```

### Production Commands

```bash
# Start production services
docker-compose -f docker-compose.prod.yml up -d

# View production logs
docker-compose -f docker-compose.prod.yml logs

# Stop production services
docker-compose -f docker-compose.prod.yml down

# Rebuild production images
docker-compose -f docker-compose.prod.yml build
```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :5000
   lsof -i :27017
   
   # Stop conflicting services
   docker-compose down
   ```

2. **MongoDB connection issues:**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Restart MongoDB
   docker-compose restart mongodb
   ```

3. **Build failures:**
   ```bash
   # Clean build
   docker-compose build --no-cache
   
   # Remove all containers and images
   docker system prune -a
   ```

4. **Permission issues:**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Health Checks

```bash
# Check if all containers are running
docker-compose ps

# Check container health
docker-compose exec server npm run health
docker-compose exec client npm run health
```

## 🔐 Environment Variables

### Development (.env file in server directory)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/todo-app?authSource=admin
```

### Production
```env
NODE_ENV=production
PORT=5000
MONGO_PASSWORD=your_secure_password
MONGODB_URI=mongodb://admin:your_secure_password@mongodb:27017/todo-app?authSource=admin
```

## 📊 Monitoring

### View Resource Usage
```bash
# Container stats
docker stats

# Service logs
docker-compose logs -f
```

### Database Access
```bash
# Connect to MongoDB
docker-compose exec mongodb mongosh -u admin -p password123

# Backup database
docker-compose exec mongodb mongodump --out /backup
```

## 🚀 Deployment

### Local Production Build
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Deployment
The production docker-compose file is ready for cloud deployment on:
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

## 🔄 Updates

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

### Update Dependencies
```bash
# Rebuild with new dependencies
docker-compose build --no-cache
docker-compose up -d
```

## 📝 Notes

- **Development mode** includes hot reload and volume mounts for live code changes
- **Production mode** uses optimized builds and minimal container sizes
- **MongoDB data** is persisted in a Docker volume
- **Network isolation** ensures secure communication between services
- **Environment variables** can be customized for different deployments

## 🆘 Support

If you encounter issues:
1. Check the logs: `docker-compose logs`
2. Verify all services are running: `docker-compose ps`
3. Ensure ports are available
4. Check Docker and Docker Compose versions 