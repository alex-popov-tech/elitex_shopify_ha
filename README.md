# Elitex Shopify Home Assignment

## Table of Contents

- [Pre-conditions](#pre-conditions)
- [Environment variables](#environment-variables)
- [How to run tests](#how-to-run-tests)
- [Artifacts](#artifacts)

### Pre-conditions

- [Node.js 18+](https://nodejs.org/en/)

Install required dependencies and populate environment variables.

```
npm install
cp -n .env.example .env
```

### Environment variables

| Var                  | Description                                                   | Default value |
| -------------------- | ------------------------------------------------------------- | ------------- |
| MAX_RETRIES          | Max tests retries                                             | `0`           |
| MAX_PARALLEL_THREADS | Max tests parallel executors                                  | `1`           |
| TIMEOUT              | Max time test will wait for action/app response to happen.    | `10000`          |
| BASE_URL             | Base url of application under test.                           | `"https://smartrr-staging-automation-1.myshopify.com"`          |

### How to run tests

Run all e2e tests

```
npm test
```

### Artifacts

Test run generates various artifacts with following structure:

```
 artifacts
├──  junit
│  └── 謹 junit.xml
├──  others
│  └── screenshots and videos will be here
└──  pw-report
   └──  index.html
```

