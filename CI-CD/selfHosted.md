## 🏠 Self-Hosted GitHub Runner – Full Setup (Step-by-Step + Comments)

### 🎯 Goal:

Set up a **self-hosted GitHub Actions runner** on your own server (e.g., EC2, VPS, or local machine) and use it to deploy a Node.js app.

---

### ✅ Why Use a Self-Hosted Runner?

| Benefit                       | Description                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| Full control                  | Choose OS, tools, and versions                                      |
| Persistent storage            | Keep Docker layers, `node_modules`, etc.                            |
| Long-running / GPU workloads  | Ideal for ML, heavy builds, or complex CI pipelines                 |
| VPC or private network access | Run builds inside secured cloud networks                            |
| Save costs                    | Avoid GitHub-hosted runner usage limits in large-scale environments |

---

### 🧰 Prerequisites

* A server (Ubuntu preferred)
* GitHub repository admin access
* Internet access from the server

---

### ⚙️ Step-by-Step Installation (with Explanation)

```bash
# Step 1: Create a working directory for the runner
mkdir actions-runner && cd actions-runner

# Step 2: Download the GitHub runner binary (URL provided by GitHub)
curl -o actions-runner-linux-x64.tar.gz \
  -L https://github.com/actions/runner/releases/download/v2.317.0/actions-runner-linux-x64-2.317.0.tar.gz

# Step 3: Extract the archive
tar xzf actions-runner-linux-x64.tar.gz

# Step 4: Configure the runner with your GitHub repository
# Replace the URL and token with your actual repo and generated token
./config.sh \
  --url https://github.com/your-username/your-repo \
  --token YOUR_GENERATED_TOKEN

# Step 5: Start the runner (manual mode)
./run.sh
```

---

### 💡 Recommended: Run as a Background Service

```bash
# Install the runner as a systemd service
sudo ./svc.sh install

# Start the service (runs in background)
sudo ./svc.sh start
```

Now the runner will:

* Start on system boot
* Restart automatically if it crashes

---

### 📁 Where to Place the Workflow File

Place the YAML workflow file in:

```
.your-repo/
└── .github/
    └── workflows/
        └── deploy.yml
```

GitHub automatically detects workflows in this path.

---

### 🧾 Example Workflow File Using This Runner

```yaml
name: Build & Deploy via Self-Hosted Runner

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: self-hosted  # Uses the self-hosted runner you just set up

    steps:
      - name: ✅ Checkout code
        uses: actions/checkout@v4

      - name: 📦 Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: 📥 Install dependencies
        run: npm ci

      - name: 🧪 Run tests
        run: npm test

      - name: 🚀 Run deployment script
        run: bash ./deploy.sh
```

---

### 🚀 Example `deploy.sh` Script

```bash
#!/bin/bash
set -e

APP_DIR="/home/ubuntu/my-node-app"
cd "$APP_DIR"

echo "🔄 Pulling latest changes..."
PREV_COMMIT=$(git rev-parse HEAD)
git pull origin main
NEW_COMMIT=$(git rev-parse HEAD)

if git diff --name-only "$PREV_COMMIT" "$NEW_COMMIT" | grep -qE 'package(-lock)?\.json'; then
  echo "📦 Dependencies changed. Installing..."
  npm ci
else
  echo "✅ No changes in dependencies"
fi

echo "🏗️ Building the app..."
npm run build

echo "🚀 Restarting app with PM2..."
npm install -g pm2
pm2 restart my-app || pm2 start npm --name my-app -- start
```

> Make sure `deploy.sh` is pushed with the repo and has executable permission:
> `chmod +x deploy.sh`

---

### 🔄 How GitHub Queues Jobs for Self-Hosted Runners

#### 🔹 Can a self-hosted runner handle multiple jobs at once?

* ❌ **No. One runner handles only one job at a time.**
* 🕒 Any extra jobs are **queued by GitHub** and wait until the runner is free.

#### 🔹 What happens when you push multiple commits?

```txt
Push 1 → Job starts on self-hosted runner ✅
Push 2 → Queued in GitHub UI ⏳
Push 3 → Queued in GitHub UI ⏳
```

#### 🔹 Where is the queue stored?

* On GitHub’s servers.
* The runner process **polls GitHub** for available jobs.

---

### ⚡ Can I Run Multiple Jobs in Parallel?

Yes — by registering **multiple runners** (instances of the runner binary) on the same or different servers:

```bash
# Clone the runner folder and register it with a different name
mkdir actions-runner-2 && cd actions-runner-2
curl -O <runner-url>
tar xzf <runner-file>
./config.sh --name runner-2
./run.sh &
```

Now you have `runner-1` and `runner-2`, each capable of running a separate job.

> Be cautious! Running multiple runners on the same low-power machine (like a t2.micro) can cause performance issues.

---

### 🔐 Security Tips

* ✅ Use a dedicated user with limited privileges on your server
* 🔐 Only add runners to private, trusted repos
* 🔄 Keep runner binaries updated
* 🔥 Restrict firewall access to GitHub IPs if possible

---

### ✅ Summary

| Concept                | Self-Hosted Runner                       |
| ---------------------- | ---------------------------------------- |
| Job isolation          | ❌ Jobs run on same persistent server     |
| Job queuing            | ✅ GitHub queues when runner is busy      |
| Parallel jobs          | ⚠️ Only if you manually add more runners |
| Persistent environment | ✅ Stays between jobs                     |
| Cleanup                | 🧹 You are responsible for it            |

✅ Use self-hosted runners for full control and flexibility — and GitHub will smartly queue jobs if they arrive too fast.

Would you like to add visual diagrams of how this runner-job queue system works?
