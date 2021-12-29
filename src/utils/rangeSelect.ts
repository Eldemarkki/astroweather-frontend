export const selectLower = <T>(table: { [key: number]: T }, value: number) => {
	return table[Object.keys(table).map(k => Number(k)).sort((a, b) => a - b).filter(key => key <= value).reverse()[0]]
}