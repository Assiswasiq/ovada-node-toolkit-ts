nodetoolkitts
=============

tool kit for node design pattern.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nodetoolkitts
$ nodetoolkitts COMMAND
running command...
$ nodetoolkitts (-v|--version|version)
nodetoolkitts/1.0.0 linux-x64 node-v14.15.4
$ nodetoolkitts --help [COMMAND]
USAGE
  $ nodetoolkitts COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nodetoolkitts add NAME`](#nodetoolkitts-add-name)
* [`nodetoolkitts hello [FILE]`](#nodetoolkitts-hello-file)
* [`nodetoolkitts help [COMMAND]`](#nodetoolkitts-help-command)

## `nodetoolkitts add NAME`

add new note

```
USAGE
  $ nodetoolkitts add NAME

ARGUMENTS
  NAME  note name to add, .md can be omitted

OPTIONS
  -f, --file=file  file to generate
  -h, --help       show CLI help
```

_See code: [src/commands/add.ts](https://github.com/Assiswasiq/ovada-node-toolkit-ts/blob/v1.0.0/src/commands/add.ts)_

## `nodetoolkitts hello [FILE]`

describe the command here

```
USAGE
  $ nodetoolkitts hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ nodetoolkitts hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Assiswasiq/ovada-node-toolkit-ts/blob/v1.0.0/src/commands/hello.ts)_

## `nodetoolkitts help [COMMAND]`

display help for nodetoolkitts

```
USAGE
  $ nodetoolkitts help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
