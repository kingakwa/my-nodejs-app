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

## 🟢step 1.Create the GitHub Repository 
1.Go to https://github.com/new
2.Repository name: my-nodejs-app
3.Keep it Public or Private
4.DO NOT initialize with a README, .gitignore, or license yet (we’ll add them locally)
5.Click Create Repository

## 🟢2: Clone the Repo to your local machine

```
   git clone https://github.com/YOUR-USERNAME/my-nodejs-app.git
   cd my-nodejs-app 
```
## 🟢step 3: Add the Project Files Locally
use the touch command:
-📁 File: index.js: https://github.com/kingakwa/my-nodejs-app/blob/main/index.js
-📁 File: package.json: https://github.com/kingakwa/my-nodejs-app/blob/main/package.json
-📁 File: test.js: https://github.com/kingakwa/my-nodejs-app/blob/main/test.js
-📁 File: .dockerignore: https://github.com/kingakwa/my-nodejs-app/blob/main/.dockerignore
-📁 File: Dockerfile: https://github.com/kingakwa/my-nodejs-app/blob/main/Dockerfile
-📁 File: .github/workflows/deploy.yml:  https://github.com/kingakwa/my-nodejs-app/blob/main/.github/workflows/main.yml

## 🟢4: Commit and Push All Files
```
git add .
git commit -m "Initial CI/CD Node.js app setup"
git push origin main
```
Run Locally
```
npm install
node index.js
```

## ☁️ step 5: Create an EC2 Server on AWS
1.Go to AWS > EC2 > Launch Instance
2.Choose Amazon Linux 2 or Ubuntu
3.Allow ports 22 (SSH), 80 (HTTP), and 3000 (App)
4.Assign an Elastic IP
5.SSH into instance:
```
ssh -i "your-key.pem" ec2-user@<your-ec2-ip>
```
## 🔧 step 6: Setup Server for Docker & Nginx
On EC2 Instance:
```
# Update & install Docker
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -aG docker ec2-user

# Install Nginx
sudo amazon-linux-extras install nginx1 -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

Edit `/etc/nginx/nginx.conf or create a file in /etc/nginx/conf.d/app.conf:`

```
server {
    listen 80;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Reload Nginx**:
```
sudo systemctl reload nginx
```


**Build Docker Image**
   ```
   docker build -t nodejs-app .
   docker run -p 3000:3000 nodejs-app
   ```
## 🔐 step 7: Add GitHub Secrets
In your GitHub repo:
`Go to Settings > Secrets and variables > Actions > New Repository Secret`
Add:
HOST: your EC2 public IP
USER: usually ec2-user
KEY: paste your private SSH key content 
PORT: SSH port (default: 22)

<img width="896" height="308" alt="Image" src="https://github.com/user-attachments/assets/4e00f650-a897-47dc-8ec2-48cc6ffc273b" />

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
## 👀 Step 8: View the Workflow Run
Go to your GitHub repo
Click the `Actions tab`

You’ll see the latest workflow run:

Green ✅ = success

Red ❌ = failure (click to debug)

<img width="845" height="431" alt="Image" src="https://github.com/user-attachments/assets/58217fde-6dcf-4653-9151-c707b201fd0a" />


## 🌐step 9: Access App
```
http://<your-ec2-ip>/
```

<img width="923" height="178" alt="Image" src="https://github.com/user-attachments/assets/acb4f46c-81a6-4ec1-9051-20bb48d59a49" />

Make sure port 80 is open in your EC2 security group.


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


##  Project Summary
🚀 CI/CD Pipeline for Node.js App with GitHub Actions and AWS EC2 Deployment
This project implements a complete CI/CD pipeline for a Dockerized Node.js application. It leverages GitHub Actions for automated testing, Docker for containerization, and deploys to an Nginx-proxied AWS EC2 instance using SSH.

✅ **Achievements**
Successfully automated build, test, and deployment workflows via GitHub Actions.

Ensured zero-downtime releases using Nginx reverse proxy.

Implemented secure deployment using GitHub Secrets and SSH.

Gained hands-on experience integrating Git, Docker, Nginx, and AWS.

⚠️ **Challenges Faced**
Configuring Nginx correctly for reverse proxy and zero-downtime switching.

Troubleshooting permission and SSH key issues during deployment.

Ensuring secrets were safely managed and used in the workflow.

📘 **Further Study & Improvements**
Add automated rollback strategy on failed deployments.

Integrate monitoring/logging tools (e.g., Prometheus, Grafana, or Splunk).

Extend pipeline with multi-environment support (staging, production).

Implement HTTPS using Let's Encrypt with Nginx.

