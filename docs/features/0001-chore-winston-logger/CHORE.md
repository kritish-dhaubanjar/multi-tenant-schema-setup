---
approved_by: "Kritish Dhaubanjar"
approved_at: "2026-10-30"
approved_sha256: "4d6803f6844cced03036e3b32228897e5fb71c15d60426fbd742f6a74dcf2093"
---
# Plan 0001 — Configurable log destination

> The ONE document of this kind of work: the issue in the words it arrived in, what was
> explored in the code before planning, the plan, and what this work SKIPS. One `lane approve`
> stamp covers all of it — plan and skips together — and this kind's one task is created with
> it. This kind runs no TDD ledger and takes no review stamp: the task is plain commits, and
> `lane done` runs the suite when test_cmd is set. Outgrown one document? Say so when you hand
> the gate over; the human decides at the stamp, and the heavier work starts as its own feature.

**Issue:** Setup a winston logger that can log to a file, datadog or console as configure.
**Explored:** `docs/context/PRODUCT.md`, `docs/context/BLUEPRINT.md`, `docs/context/CONSTITUTION.md` (config is read only from the parsed env object; process-wide clients live in `providers/`; logging today is console only). `index.ts` (the only server log is `console.log` of the listen line). `env/index.ts` and `.env.example` (Zod env schema; failure uses `console.error` / `console.dir` before a logger built from valid env can exist). `providers/database.provider.ts` and `config/database.config.ts` (the existing process-wide client pattern). `package.json` (winston is not a dependency). `prompts/database/migrate.make.ts`, `prompts/database/seed.make.ts`, `prompts/database/seed.run.ts` (CLI scripts that print to the console; not the server). `middlewares/error.middleware.ts`, `controllers/health.controller.ts`, `controllers/organization.controller.ts` (no log calls). `utilities/object.test.ts` (the only test; it does not cover logging).
**Behavior:**
- With the destination set to the console, the "API listening" line appears on the terminal when the server starts.
- With the destination set to a file, that same line is appended to the configured file and is not printed on the terminal.
- With the destination set to Datadog, that same line is delivered to Datadog and is not printed on the terminal.
- Switching among those three destinations is a configuration change. No application code edit is required.
- A file destination with no path, or a Datadog destination with no API key, refuses to start and prints the environment error the way a missing database host does.
- Health and organization HTTP responses stay as they are.
**Must NOT change:** Route paths, status codes, and JSON shapes. Knex configuration, pool settings, and which migration directories load. The `console.log` calls in `prompts/database/migrate.make.ts`, `prompts/database/seed.make.ts`, and `prompts/database/seed.run.ts`. The `console.error` / `console.dir` path in `env/index.ts` when environment validation fails. The assertions in `utilities/object.test.ts`.

## Execution Plan
> Approved BY this document's stamp: `lane start` copies this section verbatim into the
> worktree's exec-plan.md and carries your stamp onto it — no separate plan gate.

**Approach:** Add one process-wide logger in `providers/`, configured from new fields on the parsed env object. One destination is active at a time: console, file, or Datadog. Default destination is console so an existing `.env` that does not mention logging still prints the listen line. `index.ts` sends the listen line through that logger. Invalid combinations fail in `env/index.ts` before the logger is built.
**Steps:**
- `package.json` / lockfile: add the logger library and a Datadog log transport.
- `env/index.ts`: accept a destination of `console`, `file`, or `datadog` (default `console`), a file path required only for `file`, and a Datadog API key required only for `datadog`.
- `.env.example`: document those variables with console as the shown destination.
- `.gitignore`: ignore a local `logs/` directory so a file destination under the repo is not committed.
- `providers/logger.provider.ts`: create the logger. Console writes to the terminal. File appends to the configured path. Datadog sends to Datadog. Exactly one of those is attached.
- `index.ts`: replace the listen `console.log` with that logger.

## Skipped
> Every ceremony this work does not do, and why. You sign these with the plan.
- product spec: the issue is one sentence and does not change who the API is for or what the HTTP routes do. The issue line is the whole request.
- technical spec: the behavior lines name the three destinations, the configuration switch, and the startup refusal. The steps name every file. A second design document would repeat those lines.
- tests: no ledger on this kind — the existing Jest suite only covers object-key conversion and will not exercise a log line. What catches a regression is the human reading this diff, including the listen line and the three destination settings.
- review stamp: none on this kind — the diff adds a logger and points the listen line at it. It does not change request handling, SQL, or response JSON. The human reading Behavior and Skipped at this stamp is the check.
