# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo

Single-repo project to handle TTRPG (tabletop role-playing game) character sheets.

## Project lifecycle

This is a document-only repo with no build system, tests, or tooling.
It is intended to be used as static web site, no database or backdend server so far.

## General coding rules

- KEEP CODE SIMPLE : few files, explicit names and structure.
- DO NOT TRY TO TEST THE HTML FILE by launching a web server or a browser
- DO NOT GIT COMMIT CHANGES
- Always use `rem` units in CSS (1rem = 16px). Never use `px` in CSS files.
- Always use existing CSS variables for colors, never hardcode a color.

## TTRPG specific rules

Rules specific to the Table Top Role Playing Game the character sheet is to be built for will be provided in a separate .md file or skill

DO NOT INVENT TTRPG RULES IF NOT EXPLICITLY PROVIDED.
DO NOT INVENT OR ADD ELEMENTS THAT ARE NOT EXPLICITELY PROVIDED IN TTRPG SPECIFIC RULES

