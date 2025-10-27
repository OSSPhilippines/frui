# FRUI Repo Structure

The following documentation are for AI agents to help understand the 
underlying project structure and provide a coding style guide to use.

## 1. Requirements

Make sure you are using Node 22 or later.

## 2. Folder Structure

The following folders make up the frui repository.

 - components - main frui components
 - docs - compiled frui website (on build)
 - plugins - plugins used to generate the static website
 - public - static assets for the static website
 - scripts - build and development scripts
 - styles - frui library styles for components
 - tests - where test suites should go

### 2.1. Ignore Folders

Must ignore the following files and folders.

 - archives
 - docs
 - cjs
 - esm
 - node_modules

### 2.2. Scope of Work

Must ask for explicit permission to create, update or delete files from the following files and folders.

 - components
 - plugins
 - public
 - scripts
 - styles
 - frui.css

## 3. Coding Style Guides

When coding, must follow the relative code style guides.

 - General - https://raw.githubusercontent.com/cblanquera/coding/refs/heads/main/rules/coding/Coding-Standards.md
 - CSS - https://raw.githubusercontent.com/cblanquera/coding/refs/heads/main/rules/coding/CSS-Style-Guide.md
 - TypeScript - https://raw.githubusercontent.com/cblanquera/coding/refs/heads/main/rules/coding/Typescript-Style-Guide.md
 - ReactJS - https://raw.githubusercontent.com/cblanquera/coding/refs/heads/main/rules/coding/ReactJS-Style-Guide.md
 - Jest - https://raw.githubusercontent.com/cblanquera/coding/refs/heads/main/rules/testing/Jest-Testing-Style-Guide.md