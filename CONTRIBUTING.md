# StarkWager - mobile contribution guide 🎲

First off, thank you for considering contributing to StarkWager! It's people like you that make StarkWager such a great platform.

---

## Important Note Before Applying 📝

**⚠️ Avoid Generic Comments:**

Comments like:

🚫 *"Can I help on this one?"*

🚫 *"I’d love to contribute!"*

🚫 *"Checkout my profile!"*

🚫 *"Can I tackle this?"*

**Won't be considered**.

Instead, provide a **clear explanation of your approach **, including:

- An introduction about yourself
- A concise plan to solve the issue (3-6 lines max).
- Your estimated completion time (ETA).


---
## Steps to Contribute🤝

### 1. Apply for an Issue
- Look for an open issue and comment expressing your interest to work on it.
- Wait for the maintainer to assign the issue to you.
- Remember to apply only if you are able to solve the issue.
- In the comment, Add a quick introduction about yourself, The ETA, and how you plan to tackle the issue.

---
### 2. Fork and Clone the Repository
1. Fork the repository from GitHub.
2. Clone it to your local machine:
   ```bash
   git clone https://github.com/stakepoint/starkwager-frontend.git
   cd [reponame]
   ```
   
--- 

### 3. Create a Branch
Create a new branch following our branch naming convention:
```bash
git checkout -b feature/issue-title-code
```
### Branch Naming Convention

All branches should be created with the following naming pattern:

Where XXX is the issue number from our issue tracking system. For example:
- `STRKWGR-001`
- `STRKWGR-022`
- `STRKWGR-123`

---

### 4. Write Code
- Follow coding standards.
- Ensure your code is well-documented and tested.

---

### 6. Submit a Pull Request
1. Push your branch to GitHub:
   ```bash
   git push origin feature/issue-title
   ```
2. Open a pull request (PR) with:
    - A clear description of your solution.
    - A reference to the issue number.
    - Ensure your branch is up to date with the `staging` branch.
    - Push your changes to your branch.

Wait for reviews, make updates if needed, and get your PR merged!

--- 


## Commit Message Guidelines
Use the following types for your commit messages:

- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation only changes
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- **refactor:** A code change that neither fixes a bug nor adds a feature (improvements of the code structure)
- **perf:** A code change that improves performance
- **test:** Adding missing or correcting existing tests
- **build:** Changes that affect the build system or external dependencies (example scopes: gulp, npm)
- **ci:** Changes to CI configuration files and scripts (example scopes: travis, circle)
- **chore:** Other changes that don't modify src or test files
- **revert:** Reverts a previous commit

---

Thank you for contributing to StarkWager! Let us know if you need any help.
