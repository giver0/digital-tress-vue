export const useConsole = () => {
  const isActiveConsole = true
  const isShowCycleTime = false

  function consoleLog(message, object = null) {
    if (isActiveConsole) {
      if (object) {
        const newMessage = `${message} :>> `
        console.log(newMessage, object);
      } else {
        console.log(message);
      }
    }
  }

  function startCycleTime() {
    if (isShowCycleTime) {
      console.time('startCycle')
    }
  }
  function stopCycleTime() {
    if (isShowCycleTime) {
      console.timeEnd('startCycle')
    }
  }

  return {
    consoleLog,
    stopCycleTime,
    startCycleTime,
  }
}

export default useConsole
