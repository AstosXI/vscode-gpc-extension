# Change Log

## 1.1.1 - 3/21/2025

### Removed

- Function parameter validation ( Temporarily )

### Fixed

- Arrays not being recognized if they have comments within them.

### Added

- Document symbols
  - Press `Ctrl + Shift + P` then remove the `>` and type `@` to scroll through
    the different variables and functions.
- Symbol renaming
- Symbol references
- Go-to symbol definition

## 1.1.0 - 3/7/2025

### Fixed

- LSP Start up

### Changed

- All regex patterns for better capturing
- Documentation part of IntelliSense for Variables
- Documentation part of IntelliSense for Keywords

### Added

- Missing Data types
- `combo`s to IntelliSense
- Error diagnostics for
  - Decimal numbers : Will Show a warning
  - Unknown characters ( # @ ) : Will show a warning
  - Function calls with invalid parameter amounts : Will show an error
  - Include Statements when outside of a Toriel Project Directory

- [Toriel IDE's Build system](https://github.com/zkiwiko/Toriel-IDE?tab=readme-ov-file#pre-processors--macros)
  - `Ctrl + Shift + P` then type 'GPC' and select the command
- Code Snippets for
  - For Loops : Looks like `For~`
  - While Loops : Looks like `While~`
  - If statements : Looks like `If~`
  - If-Else statements : Looks like `Ifelse~`
  - Function definitions : Looks like `Function~`

### Fixed

- Built-in functions being highlighted as User-Defined functions
- A bug making hover info activate with selected text
- A couple typos
- `duint` and `dint` being data types and not functions

### Optimized

- IntelliSense Hover imformation
- The source code to make it actually readable

## 1.0.3 - 11/11/2024

- Made Comments appear in the Documentation part of 2D arrays.
- Properly fixed enum members not appearing if enums have any type of commented
  name or null.

## 1.0.2 - 11/11/2024

- Fixed enum members no appearing if enums have a commented name.
- Added Image data type.

## 1.0.1 - 11/11/2024

- Fixed duplicate Constants, added missing Constants.

## 1.0.0 - 11/11/2024

- Initial release
