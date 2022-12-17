import {
  GENOME_COUNT,
  GENOME_MAX_VALUE,
} from '@/constant/basic'
import useGeneral from '@/use/use-general'

export const useGenome = () => {
  const {
    getRandomInt,
  } = useGeneral()

  function generateGenome() {
    const genome = new Array(GENOME_COUNT).fill(0)
    .map(() => {
      return {
        // feature for future
        // upGen: {
        //   nextGen: getRandomInt(0, GENOME_MAX_VALUE),
        // },
        upGen: getRandomInt(0, GENOME_MAX_VALUE),
        downGen: getRandomInt(0, GENOME_MAX_VALUE),
        leftGen: getRandomInt(0, GENOME_MAX_VALUE),
        rightGen: getRandomInt(0, GENOME_MAX_VALUE),
      }
    })
    console.log('genome', genome)
    return genome
  }

  return {
    generateGenome,
  }
}

export default useGenome
