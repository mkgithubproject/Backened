
Here’s a comprehensive list of **Git interview questions** categorized by difficulty level — along with **simple explanations and examples** wherever applicable. This is especially useful for backend or DevOps developers.

---

## 🟢 **Basic Git Interview Questions**

### 1. **What is Git?**

Git is a **distributed version control system** that helps developers track changes in source code and collaborate efficiently.

---

### 2. **What is the difference between Git and GitHub?**

* **Git** is a tool for version control.
* **GitHub** is a cloud-based hosting service for Git repositories.

---

### 3. **What are the basic Git commands?**

| Command               | Description               |
| --------------------- | ------------------------- |
| `git init`            | Initialize a new Git repo |
| `git clone <url>`     | Clone an existing repo    |
| `git status`          | Show changes              |
| `git add .`           | Stage changes             |
| `git commit -m "msg"` | Commit staged changes     |
| `git push`            | Push to remote            |
| `git pull`            | Fetch + merge from remote |
| `git log`             | Show commit history       |

---

### 4. **What is the difference between `git pull` and `git fetch`?**

* `git pull`: Fetches and **merges** remote changes.
* `git fetch`: Fetches remote changes **without merging**.

---

### 5. **What is a Git branch?**

A **branch** is an independent line of development.
Example:

```bash
git branch feature/login
git checkout feature/login
```

---

### 6. **How do you merge branches in Git?**

```bash
git checkout main
git merge feature/login
```

---

### 7. **What is a merge conflict and how do you resolve it?**

A **merge conflict** happens when Git can’t automatically reconcile changes.
You resolve it manually by editing the conflicted files and running:

```bash
git add <file>
git commit
```

---

## 🟡 **Intermediate Git Interview Questions**

### 8. **What is the `.gitignore` file?**

This file tells Git **which files/folders to ignore** (e.g., `node_modules`, `.env`).

```txt
node_modules/
.env
```

---

### 9. **What is the difference between `git reset`, `git revert`, and `git checkout`?**

| Command        | Use                                          | Example                   |
| -------------- | -------------------------------------------- | ------------------------- |
| `git reset`    | Undo commits (history rewrite)               | `git reset --hard HEAD~1` |
| `git revert`   | Create a new commit that undoes previous one | `git revert <commit-id>`  |
| `git checkout` | Switch branches or restore files             | `git checkout main`       |

---

### 10. **What is a detached HEAD in Git?**

It means you’re not on a branch, but on a **specific commit**.

---

### 11. **What is the difference between `git stash` and `git commit`?**

* `git stash`: Temporarily saves changes (without committing).
* `git commit`: Permanently saves the changes.

---

### 12. **How to undo a `git commit` that hasn’t been pushed?**

```bash
git reset --soft HEAD~1  # keep changes staged
git reset --mixed HEAD~1 # keep changes in working directory
```

---

## 🔴 **Advanced Git Interview Questions**

### 13. **What are rebasing and its benefits?**

`git rebase` moves your branch commits on top of another.

```bash
git checkout feature
git rebase main
```

* Keeps history linear.
* Avoids merge commits.

---

### 14. **What is cherry-picking in Git?**

Apply a specific commit from one branch to another:

```bash
git cherry-pick <commit-id>
```

---

### 15. **What is a Git tag?**

Tags are used to **mark specific points**, like version releases:

```bash
git tag v1.0
git push origin v1.0
```

---

### 16. **How to revert a pushed commit?**

```bash
git revert <commit-id>
git push origin main
```

---

### 17. **What is the difference between `origin` and `upstream`?**

* `origin`: Your forked repo.
* `upstream`: The original repo you forked from.

---

### 18. **What is the reflog?**

`git reflog` shows a **log of all HEAD movements** — very useful to recover lost commits.

---

### 19. **How do you squash commits?**

Squashing combines multiple commits into one:

```bash
git rebase -i HEAD~3
```

---

### 20. **How do you resolve conflicts during rebase?**

Edit conflicted files manually → then:

```bash
git add <file>
git rebase --continue
```

---

## 🧠 Bonus Tips for Interview

* Always mention your **workflow**: GitFlow, trunk-based, etc.
* Know how to:

  * Clone repos
  * Create pull requests
  * Handle CI/CD triggers on Git events
* Common commands to review:

  ```bash
  git diff
  git shortlog
  git clean
  git blame
  ```

---

Would you like me to generate a **PDF cheat sheet** or an **interactive Git quiz** based on this?

---

## ✅ **1. `git revert <commit-id>`**

> 🔄 **Safely undoes a specific commit** by creating a **new commit** that reverses its changes.

### ✔️ Key Points:

* You **can revert any specific commit** (even in the middle of the history).
* The commit stays in the history.
* Great for **collaborative (shared) repos** — no history rewrite.

### 🧠 Example:

Your commit history:

```
A — B — C — D — E  (HEAD)
```

You run:

```bash
git revert C
```

Now history becomes:

```
A — B — C — D — E — C'  ← new commit that undoes C
```

---

## 🔁 **2. `git reset`**

> ⚠️ **Moves HEAD (and optionally deletes or keeps changes)**. Can be used to **remove commits**.

### ✔️ Key Points:

* You **go back to a previous commit** (like undoing commits).
* You lose commits if `--hard` is used.
* Not safe to use on shared branches.

### 🧠 Example:

Original:

```
A — B — C — D — E  (HEAD)
```

Run:

```bash
git reset --hard C
```

Now:

```
A — B — C (HEAD)     ← D and E are gone!
```

---

## ✅ Summary Comparison:

| Action                                  | `git revert` | `git reset`                           |
| --------------------------------------- | ------------ | ------------------------------------- |
| Can undo specific commit in the middle? | ✅ Yes        | ❌ No (moves HEAD only)                |
| Keeps history safe (no loss)?           | ✅ Yes        | ❌ No (can lose commits with `--hard`) |
| Creates a new commit?                   | ✅ Yes        | ❌ No                                  |
| Use in shared repo?                     | ✅ Yes        | ❌ No (dangerous)                      |

---

Would you like a **real Git repo example** or **visual dry run** with dummy commits?
