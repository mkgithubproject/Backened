Here's a quick **DevOps Basics Q\&A Sheet** for your Node.js backend interviews, covering the core topics you mentioned:

---

## 🧰 8. DevOps Basics (for Interviews)

### 🔹 **Topic: Docker**

> **Q: How to Dockerize a Node.js app?**
> **A:**
> To Dockerize a Node.js app:

1. Create a `Dockerfile`:

   ```dockerfile
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```
2. Build the image:

   ```bash
   docker build -t my-node-app .
   ```
3. Run the container:

   ```bash
   docker run -p 3000:3000 my-node-app
   ```

✅ Tip: Use `.dockerignore` to avoid copying `node_modules`.
### 🐳 What is Docker?

**Docker** is an **open-source platform** used to develop, ship, and run applications inside **containers**.

---

### 🚀 In Simple Terms:

Docker allows you to:

* Package your application **with everything it needs** (code, libraries, dependencies)
* Run it **anywhere** — your machine, a teammate’s laptop, or a cloud server — and it **works the same**.

---

### 📦 What is a Container?

A **container** is like a **lightweight virtual machine**, but faster and more efficient. It:

* Uses your host system's OS kernel (no full OS like a VM)
* Is isolated from other containers and the host system
* Can be started or stopped in seconds

---

### 🧱 Key Components of Docker:

| Component            | Description                                       |
| -------------------- | ------------------------------------------------- |
| **Docker Engine**    | The runtime that runs containers                  |
| **Dockerfile**       | A script to define how to build a container image |
| **Docker Image**     | A snapshot of your app and its environment        |
| **Docker Container** | A running instance of an image                    |
| **Docker Hub**       | A cloud registry to store and share images        |

---

### 🔁 How Docker Works (Simple Flow):

1. You write a `Dockerfile` that describes your app environment.
2. Run `docker build` to create an **image**.
3. Run `docker run` to start a **container** from that image.

---

### 📘 Example

#### Sample `Dockerfile` for a Node.js App:

```Dockerfile
# Step 1: Use the official Node.js 18 image as the base image
FROM node:18

# Step 2: Set the working directory inside the container to /app
WORKDIR /app

# Step 3: Copy only package.json and package-lock.json to install dependencies first (cache optimization)
COPY package*.json ./

# Step 4: Install dependencies using npm
RUN npm install

# Step 5: Copy all the files from current directory to the working directory in the container
COPY . .

# Step 6: Expose port 3000 (optional metadata for documentation purposes)
EXPOSE 3000

# Step 7: Define the default command to run the application
CMD ["node", "app.js"]
```

#### 🔧 Commands to Build and Run:

```bash
# Build the Docker image and tag it as 'my-node-app'
docker build -t my-node-app .

# Run the container, map host port 3000 to container port 3000
docker run -p 3000:3000 my-node-app
```

---

### ✅ Why Use Docker?

| Benefit        | Description                                     |
| -------------- | ----------------------------------------------- |
| 🚀 Portability | Runs the same on any environment                |
| ⚙️ Isolation   | Apps run independently in separate containers   |
| 🧪 Consistency | Same environment from development to production |
| 📉 Lightweight | Uses fewer resources than VMs                   |
| ⏱️ Fast        | Starts in seconds                               |

---

Would you like to see how Docker compares to Virtual Machines or how to dockerize a project step by step?


---

### 🔹 **Topic: CI/CD**

> **Q: What is a typical CI/CD flow?**
> **A:**
> A typical CI/CD pipeline for a Node.js app includes:

1. **Continuous Integration (CI)**:

   * Code pushed to GitHub triggers the pipeline
   * Steps:

     * Install dependencies
     * Run unit tests (e.g., with Jest)
     * Linting / Code formatting checks
     * Build the app

2. **Continuous Deployment (CD)**:

   * If CI passes:

     * Build Docker image
     * Push to Docker Hub or ECR
     * Deploy to server (e.g., EC2, Kubernetes, etc.)
     * Run health checks

**Tools:** GitHub Actions, GitLab CI, Jenkins, CircleCI, etc.

✅ Tip: Use `.env` and secret managers for sensitive configs.

---

### 🔹 **Topic: Load Balancer**

> **Q: How do you scale a Node.js app?**
> **A:**
> To scale a Node.js app horizontally:

1. **Multiple Instances**:

   * Run multiple Node.js instances (Docker containers, PM2 cluster mode, etc.)

2. **Use a Load Balancer**:

   * Example: Nginx, HAProxy, or AWS ELB
   * Distributes traffic across Node.js instances

3. **Stateless Design**:

   * Store sessions in Redis or DB (not in-memory)

4. **Horizontal Scaling**:

   * Use container orchestration like **Kubernetes** or **Docker Swarm** to scale automatically

✅ Tip: Monitor CPU/Memory and set auto-scaling policies.

---

Let me know if you want more topics like **Monitoring, Logging, Terraform, or Kubernetes** added to this list.



### github runner :
```
A GitHub Runner is a server or a virtual machine that runs your GitHub Actions workflows.
 It's what actually executes the steps defined in your .github/workflows/*.yml files.
```
## 🛠 GitHub Actions Deployment with SSH PEM Key – Explained

### 🎯 Goal:

Automatically deploy your Node.js app to an EC2 server using GitHub Actions + PEM key securely via GitHub Secrets.

---

### 📂 File Structure

```
my-node-app/
├── .github/
│   └── workflows/
│       └── deploy.yml
└── (your app files)
```

---

### 🔐 GitHub Secrets Required

| Secret Name   | Value                                       |
| ------------- | ------------------------------------------- |
| EC2\_SSH\_KEY | Contents of your `.pem` file                |
| EC2\_HOST     | e.g., ec2-12-34-56-78.compute.amazonaws.com |
| EC2\_USER     | Usually `ubuntu` for EC2 Ubuntu instances   |

---

### 🧾 GitHub Actions Workflow (`deploy.yml` with line-by-line explanation)

```yaml
name: CI/CD - Node.js Deploy to EC2  # Name shown in GitHub Actions UI

on:
  push:
    branches:
      - main  # Trigger the workflow only when code is pushed to the 'main' branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest  # Use GitHub-hosted runner with Ubuntu OS

    steps:
      - name: ✅ Checkout source code
        uses: actions/checkout@v4  # Clones your repository code into the runner

      - name: 📦 Set up Node.js
        uses: actions/setup-node@v4  # Official action to install Node.js
        with:
          node-version: '20'  # Specify Node.js version

      - name: 📥 Install dependencies
        run: npm ci  # Clean install of all Node.js dependencies

      - name: 🧪 Run tests
        run: npm test  # Execute test cases defined in your project

      - name: 🏗️ Build the app (if applicable)
        run: npm run build  # Build your app (optional if not needed)

      - name: 🔐 Set up SSH access to EC2
        run: |
          mkdir -p ~/.ssh  # Create SSH directory in runner
          echo "${{ secrets.EC2_SSH_KEY }}" > ~/.ssh/id_rsa  # Write PEM key from GitHub Secrets
          chmod 600 ~/.ssh/id_rsa  # Secure the key with correct permissions
          ssh-keyscan -H ${{ secrets.EC2_HOST }} >> ~/.ssh/known_hosts  # Prevent SSH prompt

      - name: 🚀 Deploy to EC2 and restart app
        run: |
          ssh ${{ secrets.EC2_USER }}@${{ secrets.EC2_HOST }} 'bash ~/deploy.sh'  # SSH into EC2 and run deploy script
```

---

### 📜 Example `deploy.sh` Script on EC2 Server

```bash
#!/bin/bash
set -e

cd /home/ubuntu/my-node-app

echo "🔄 Pulling latest code..."
git pull origin main

echo "📦 Installing deps..."
npm ci

echo "🏗️ Building..."
npm run build

echo "🚀 Restarting app with PM2..."
pm install -g pm2  # Ensure PM2 is available
pm2 restart my-app || pm2 start npm --name my-app -- start
```

> Place this `deploy.sh` file inside your EC2 home directory: `~/deploy.sh`
> Make it executable: `chmod +x ~/deploy.sh`

---

### 🔄 What Happens Inside the Runner?

| Step                       | Purpose                                              |
| -------------------------- | ---------------------------------------------------- |
| `mkdir -p ~/.ssh`          | Creates SSH config directory in the runner VM        |
| `echo > ~/.ssh/id_rsa`     | Injects your PEM file into the runner                |
| `chmod 600 ~/.ssh/id_rsa`  | Ensures SSH will accept and use the key              |
| `ssh-keyscan`              | Adds EC2 to known hosts (avoids prompts)             |
| `ssh user@host 'bash ...'` | Executes `deploy.sh` remotely using the injected key |

---

### ✅ Final Checklist

* [x] You pushed code to `main`
* [x] GitHub-hosted runner was triggered
* [x] SSH private key (`.pem`) is injected into runner via secrets
* [x] GitHub runner connects to EC2
* [x] EC2 pulls latest code, installs, builds, restarts app

---

### 📌 Extra Tips

* 🔐 Never commit your PEM key to the repo
* 💾 You can expand `deploy.sh` to include DB migrations
* 📊 Use `Slack`, `Discord`, or `Email` actions for deployment alerts
* 🐳 For Dockerized apps, replace build/run commands with Docker commands

---

### 📜 Summary

* GitHub-hosted runners are temporary VMs.
* They **don’t have access to your local PEM**.
* You provide that key via **GitHub Secrets**, and inject it inside `~/.ssh/id_rsa`.
* SSH then uses it automatically to connect to EC2.

✅ **Secure, automated, and production-ready.**

```
### Run npm ci Only If Dependencies Changed

#!/bin/bash
set -e

APP_DIR="/home/ubuntu/my-node-app"
cd "$APP_DIR"

echo "🔄 Pulling latest code..."

# Store current HEAD commit hash
PREV_COMMIT=$(git rev-parse HEAD)

# Pull latest changes from remote
git pull origin main

# Store new HEAD commit hash
NEW_COMMIT=$(git rev-parse HEAD)

# Check if package.json or package-lock.json changed between commits
if git diff --name-only "$PREV_COMMIT" "$NEW_COMMIT" | grep -qE 'package(-lock)?\\.json'; then
  echo "📦 Dependencies changed. Installing..."
  npm ci
else
  echo "✅ No dependency changes. Skipping npm install."
fi
echo "🏗️ Building..."
npm run build

echo "🚀 Restarting app with PM2..."
pm2 restart my-app || pm2 start npm --name my-app -- start

```
