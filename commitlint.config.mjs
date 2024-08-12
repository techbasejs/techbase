const Configuration = {
  rules: {
    "commit-rule": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "commit-rule": ({ raw }) => {
          if (!raw) {
            return [false, "Commit message should not be empty"];
          }
          /**
           * Commit with format "[PRJ-123]type_commit: content"
           * Example:
           *    "[MEN-123]feat: create login page"
           *    "[MEN-123][BUG-321]fix: fix bug 321"
           * Type Commit:
           *  ✨ feat: Adding a new feature
           *  🐛 fix: Fixing a bug
           *  💄 style: Add or update styles, ui or ux
           *  🔨 refactor: Code change that neither fixes a bug nor adds a feature
           *  📝 docs: Add or update documentation
           *  ⚡️  perf: Code change that improves performance
           *  ✅ test: Adding tests cases
           *  ⏪️ revert: Revert to a commit
           *  👷 build: Add or update regards to build process
           *  🐎 ci: Add or update regards to CI process
           */
          const regex =
            /^(feat|fix|style|refactor|docs|revert|build|ci|perf|test|chore|format|core):[\d\sA-Za-z]+/;
          const commitValid = regex.test(raw);
          if (commitValid) {
            return [true];
          }

          return [
            false,
            "Commit invalid rule option - Commit must match format rule [ISSUE-ID]type: content. \n\tExample: feat: create login page",
          ];
        },
      },
    },
  ],
};

export default Configuration;
