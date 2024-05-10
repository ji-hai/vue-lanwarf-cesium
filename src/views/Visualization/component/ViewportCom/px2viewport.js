export const fitChartSize = (size, defalteWidth = 1920) => {
  let clientWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return size
  let scale = clientWidth / defalteWidth
  return Number((size * scale).toFixed(3))
}
