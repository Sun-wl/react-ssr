export const isParamIdValid = val => {
  if(val === 'null' || val === 'undefined' || !val){
    return false
  }
  return true
}