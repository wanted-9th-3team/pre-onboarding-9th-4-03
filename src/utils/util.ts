const convertRawDataToChartData = (rawData: any[], type: 'bar' | 'line') => {
  const convertedData = Object.entries(rawData).reduce((acc, curr) => {
    const value = curr[1]
    return [...acc, type === 'bar' ? value.value_bar : value.value_area]
  }, [] as number[])

  return {
    type,
    label: type === 'bar' ? 'bar' : 'area',
    data: convertedData,
    fill: type !== 'bar',
    yAxisID: type === 'bar' ? 'y' : 'y2',
  }
}

export default convertRawDataToChartData
