# Contributing to Veehance UI 🤝

## Guidelines

- Please ensure the coding style running `composer lint`.
- Send a coherent commit history, making sure each individual commit in your pull request is meaningful.
- You may need to [rebase](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) to avoid merge conflicts.
- Please remember that we follow [SemVer](http://semver.org/).

## Reporting issues

- Before opening a new issue, first [search for existing issues](https://github.com/ingniius/ui/issues?q=) to avoid
  duplications.
- Provide detailed reports to make things easier for maintainers.
- If there's a weird bug, please provide a reproduction repository on GitHub (or in CodePen or Tailwind Play)

## Setup

Clone your fork, then install the dev dependencies:

```bash
composer install
```

## Lint

Lint your code:

```bash
composer lint
```

## Tests

Run all tests:

```bash
composer test
```

Check types:

```bash
composer type:analyse
```

Unit tests:

```bash
composer test:unit
```
