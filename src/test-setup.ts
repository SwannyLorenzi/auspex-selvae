import 'zone.js/testing';
(globalThis as { $localize?: (msg: string) => string }).$localize = (msg: string) => msg;
