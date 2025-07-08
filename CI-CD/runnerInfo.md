**Title: ✅ Two Types of GitHub Runners**

---

### 🔍 What is a GitHub Runner?

A **GitHub runner** is a machine (virtual or physical) that **executes the jobs** defined in your GitHub Actions workflows. It runs the scripts in your `.github/workflows/*.yml` files whenever an event (like a push or pull request) triggers a workflow.

---

### 🧠 How does a GitHub Runner Agent work?

* The **runner agent** is a background program that you install on a self-hosted machine.
* It **connects securely** to GitHub using a registration token.
* Once connected, it **polls or uses WebSocket** to listen for workflow jobs.
* When a job is assigned, it **downloads the workflow** and executes the steps.
* It then **sends logs and results** back to GitHub in real-time.

> ⚙️ It's not a server or a library. It's a **long-running process** (daemon-like) that acts like a job executor for GitHub Actions.

---

A **GitHub runner** is a machine (virtual or physical) that **executes the jobs** defined in your GitHub Actions workflows. It runs the scripts in your `.github/workflows/*.yml` files whenever an event (like a push or pull request) triggers a workflow.

---

### 1. GitHub-hosted Runner

* ✔️ Provided by GitHub.
* ⏳ Spins up a **temporary virtual machine** (e.g., Ubuntu, Windows).
* ❌ You don’t manage or maintain the machine.
* 🌂 Fresh environment **for every job**.
* ⚠️ Everything is destroyed after the job completes.

> Best for: Simplicity, security, and quick setup.

---

### 2. Self-hosted Runner

* ✅ You manage your own **server, VM, or even Raspberry Pi**.
* 🔗 You install GitHub's runner agent on it.
* 🚼 The machine stays online and listens for jobs.
* ⚖️ Useful when you need:

  * Custom dependencies
  * Persistent environment
  * More powerful machines

> Best for: Custom environments, performance needs, or private infrastructure.

---

### 📊 Comparison Table:

| Type                 | Description                                   |
| -------------------- | --------------------------------------------- |
| GitHub-hosted runner | Temporary VM spun up by GitHub for each job   |
| Self-hosted runner   | Persistent machine you configure and maintain |

Would you like a visual comparison or YAML example showing how to target each type?
