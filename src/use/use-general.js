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

  return {
    generateID,
    generateRandomColor,
  }
}

export default useGeneral
