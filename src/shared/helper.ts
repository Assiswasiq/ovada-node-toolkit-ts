
export const snakeToCamel = (str: string, replacer: string) =>  str.replace(
  /([-_][a-z])/g,
  group => group.toUpperCase()
  .replace('-', replacer)
  .replace('_', replacer)
)

export const formatClassName = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const snakeToKabab = (str: string) =>  str.replace(
  /([-_][a-z])/g,
  group => group.replace('_', '-')
)

export const matchLineNumber = (matchedString: any) => {
  if (!matchedString) {
    return -1
  }
  let line = 1
  console.log('matchedString', matchedString);
  for (let i = 0; i < matchedString.index; i++) {
    if (matchedString.input[i] === '\n') {
      line++
    }
  }
  return line
}
