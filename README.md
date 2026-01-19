# @arpadroid/logger

Terminal logging helpers with consistent styling and task-oriented output.

## Install

```bash
npm install @arpadroid/logger
```

## Usage

```js
import { log, logStyle } from '@arpadroid/logger';

log.task('module', 'Building assets');
log.info('All set');
console.log(logStyle.heading('Heading'));
```
