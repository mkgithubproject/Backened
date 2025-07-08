
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
