# Security Policy

## Supported versions

denseui is pre-1.0. Security fixes land on `main` and in the latest published version of the `denseui` CLI.

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Report them privately through [GitHub Security Advisories](https://github.com/Fanaperana/denseui/security/advisories/new). Include:

- What is affected (CLI, MCP server, registry, a component)
- Steps to reproduce or a proof of concept
- The impact you expect

You can expect an acknowledgement within a few days. Once a fix is ready, it will be released and credited to you in the advisory unless you prefer otherwise.

## Scope

Especially relevant areas:

- **CLI** (`packages/cli`): writing files into user projects, path handling, registry payload validation, installing npm packages
- **MCP server**: tools exposed to AI assistants
- **Components**: XSS or unsafe HTML handling in component code that ships into user projects
