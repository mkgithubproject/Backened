## ⚙️ Jenkins Setup Guide – Line-by-Line with Explanations

### 🎯 Goal:

Set up Jenkins on an Ubuntu server and run your first CI/CD job using a `Jenkinsfile`.

---

### 🧰 Prerequisites

* A fresh Ubuntu server (e.g. EC2, local VM, or VPS)
* Java (required for Jenkins)
* Internet access
* Admin privileges (sudo)

---

### 🛠 Step 1: Install Java

```bash
# Update packages
sudo apt update

# Install OpenJDK 11 (Jenkins requires Java)
sudo apt install -y openjdk-11-jdk

# Verify installation
java -version
```

---

### 🛠 Step 2: Add Jenkins Repository and Install Jenkins

```bash
# Add Jenkins repository key
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Add the Jenkins repository
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Update package list and install Jenkins
sudo apt update
sudo apt install -y jenkins
```

---

### 🚀 Step 3: Start Jenkins

```bash
# Start and enable Jenkins service
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Check status
sudo systemctl status jenkins
```

---

### 🌐 Step 4: Access Jenkins Web Interface

1. Open your browser: `http://<your-server-ip>:8080`
2. First-time login: retrieve admin password

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

3. Paste it into the browser
4. Install suggested plugins (recommended)
5. Create first admin user

---

### 🧱 Step 5: Set Up First Jenkins Job

1. Go to **Dashboard → New Item**
2. Choose **"Pipeline"** → Enter a name → Click OK
3. Scroll to **Pipeline section**, choose **"Pipeline script from SCM"**
4. Select **Git** and paste your repo URL
5. Set script path (usually `Jenkinsfile`)
6. Save and click **Build Now**

---

### 📜 Example Jenkinsfile (Node.js)

```groovy
pipeline {
  agent any  // Run on any available agent

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/your/repo.git'  // Clone repo
      }
    }

    stage('Install Deps') {
      steps {
        sh 'npm ci'  // Install node modules
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test'  // Run your test suite
      }
    }

    stage('Deploy') {
      steps {
        sh './deploy.sh'  // Run deploy script
      }
    }
  }
}
```

---

### 🔐 Security Tips

* 🔑 Change Jenkins default admin password
* 🔒 Use HTTPS (behind Nginx or reverse proxy)
* 📦 Install only trusted plugins
* 👥 Use role-based access plugin for team control

---

### ✅ Summary

* Jenkins gives you full control of your CI/CD system
* Easy to run on your own server
* Ideal for customized, plugin-driven pipelines

Would you like to add GitHub webhook triggers or run jobs on agents? Let me know!
