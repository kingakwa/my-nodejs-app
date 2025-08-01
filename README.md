# 🚀 CI/CD Pipeline for Node.js App using GitHub Actions & AWS EC2

This project demonstrates a full CI/CD pipeline for a Dockerized Node.js application deployed on an AWS EC2 instance. It includes automated testing, containerization with Docker, deployment with GitHub Actions, and zero-downtime updates using Nginx.


## 🧰 Tech Stack

- Node.js
- Docker
- GitHub Actions
- AWS EC2 (Amazon Linux 2 or Ubuntu)
- Nginx
- PM2 (optional for process management)
- Flask (optional for rollback)



## 📁 Project Structure

```
bash
my-nodejs-app/
├── index.js             # Main server file
├── package.json         # Project config and scripts
├── Dockerfile           # Docker image instructions
├── test.js              # Basic test script
├── .dockerignore
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions pipeline
```
## 📷 Architecture Diagram (Described)

<img width="311" height="203" alt="Image" src="https://github.com/user-attachments/assets/b186dc2c-9aea-4678-a35d-280b548208ef" />

🔧 Setup Instructions
✅ Create my-nodejs-app GitHub Repo with All Project Files
## 🟢1.Create the GitHub Repository 
1.Go to https://github.com/new
2.Repository name: my-nodejs-app
3.Keep it Public or Private
4.DO NOT initialize with a README, .gitignore, or license yet (we’ll add them locally)
5.Click Create Repository

## 🟢2. Clone the Repo to your local machine

```
   git clone https://github.com/YOUR-USERNAME/my-nodejs-app.git
   cd my-nodejs-app 
```
## 🟢3. Add the Project Files Locally
📁 File: index.js 
2. Run Locally
```
npm install
node index.js
```
`Visit http://localhost:3000`

3. Build Docker Image
   ```
   docker build -t nodejs-app .
   docker run -p 3000:3000 nodejs-app
   ```
## 🚀 Deployment Pipeline
CI/CD Workflow

```
- Trigger: Git push to main
- Step 1: Checkout code
- Step 2: Run unit tests
- Step 3: Build Docker image
- Step 4: SSH into EC2 instance
- Step 5: Stop old container
- Step 6: Pull latest code & rebuild
- Step 7: Run new container
```
## 🔐 GitHub Secrets Configuration
Secret Name	            Description
HOST	                  Public IP of your EC2 instance
USER	                  SSH username (e.g., ec2-user)
KEY	                   Your private SSH key contents
PORT	                 SSH port (default: 22)

## 🔄 Rollback (Optional Script)

In your deploy script section (GitHub Actions), include:
```
docker tag nodejs-app nodejs-app:previous || true
docker build -t nodejs-app .
if docker run -d -p 3000:3000 --name nodejs-app nodejs-app; then
  echo "✅ Deployment successful"
else
  echo "❌ Deployment failed, rolling back..."
  docker rm -f nodejs-app || true
  docker run -d -p 3000:3000 --name nodejs-app nodejs-app:previous
fi
```
## 🌐 Access App
```
http://<your-ec2-ip>/
```
Make sure port 80 is open in your EC2 security group.


## 📌 Goals Achieved
✅ Automated testing on push

✅ Dockerized Node.js app

✅ Seamless deployment to EC2

✅ Nginx for zero-downtime release

✅ Rollback on failure support

