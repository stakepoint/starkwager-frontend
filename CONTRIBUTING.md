# StarkWager Mobile Contribution Guide 🎲

Thank you for contributing to StarkWager! Your efforts help make this platform great.

## 🚨 Important Note Before Applying

Avoid generic comments like:  
🚫 _"Can I help?"_  
🚫 _"I’d love to contribute!"_  
Instead, include:

1. A brief introduction about yourself.
2. A concise plan to solve the issue (3-6 lines).
3. Your estimated completion time (ETA).

---

## Steps to Contribute 🤝

### 1. Apply for an Issue

- Choose an open issue and comment with your plan.
- Wait for the maintainer to assign the issue to you.
- Apply only if you’re confident in solving it.

### 2. Fork & Clone the Repo

1. Fork the repo on GitHub.
2. Clone it locally:
   ```bash
   git clone https://github.com/stakepoint/starkwager-frontend.git
   cd starkwager-frontend
   ```

### 3. Create a Branch

Follow this naming convention:  
`feature/issue-title-XXX` (where XXX is the issue number). Example:

- `STRKWGR-001`
- `STRKWGR-123`

### 4. Write Code

- Adhere to coding standards.
- Add documentation and tests.

### 5. Submit a Pull Request (PR)

1. Push your branch:
   ```bash
   git push origin feature/issue-title-XXX
   ```
2. Open a PR with:
   - A clear description of your solution.
   - A reference to the issue number.
   - Updates merged with `staging`.

---

## 📂 Project Structure

### Folder Organization

1. **`app/`**:

   - **Purpose**: Use this folder only to render components.
   - Keep it lean and focused on rendering logic.

2. **`module/`**:

   - **Purpose**: Build all new pages and related functionality here.
   - Create modular, self-contained features for scalability.

3. **Other Guidelines**:
   - Keep components reusable and within their respective modules.
   - Svgs should go inside the `/svgs` folder
   - UI should go inside the `/components/ui` folder
   - Shared utilities and assets should go into a designated `libs/` folder.

---

## Commit Message Guidelines

Use these prefixes for commits:

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Non-functional code changes (e.g., formatting)
- **refactor:** Code structure improvements
- **perf:** Performance enhancements
- **test:** Adding or updating tests
- **build:** Build-related changes
- **ci:** CI configuration updates
- **chore:** Non-code changes (e.g., config files)
- **revert:** Reverting a commit

---

Thank you for helping StarkWager grow! If you need assistance, feel free to reach out. 😊
