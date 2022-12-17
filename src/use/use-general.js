import {
  TYPE_FIELD,
  BASIC_COLOR,
  GENOME_COUNT,
  GENOME_MAX_VALUE,
} from '@/constant/basic'
import treeObject from '@/components/classes/treeObject'

export const useGeneral = () => {
  function generateID() {
    const length = 6
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  function generateRandomColor() {
    let randomColor = BASIC_COLOR
    while (randomColor === BASIC_COLOR || randomColor.length !== 7) {
      randomColor = '#'
      randomColor += Math.floor(Math.random() * 16777215).toString(16)
    }
    return randomColor
  }

  function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }

  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str
    return str.substring(0, index) + chr + str.substring(index + 1)
  }

  function changeLittleBitColor(color) {
    const randomInt = Math.floor(Math.random() * 6) + 1;
    let newColor = ''
    newColor += color
      const symbol = color[randomInt];
      if (symbol === 'f') {
        newColor = setCharAt(newColor, randomInt, '0')
      } else if (symbol === '9') {
        newColor = setCharAt(newColor, randomInt, 'a')
      } else if (symbol < '9') {
        newColor = setCharAt(newColor, randomInt, String(Number(symbol) + 1))
      } else {
        newColor = setCharAt(newColor, randomInt, nextChar(symbol))
      }
    return newColor
  }

  function restartPage() {
    location.reload()
  }

  return {
    restartPage,
    generateID,
    generateRandomColor,
    changeLittleBitColor,
  }
}

export default useGeneral
