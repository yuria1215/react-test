// Answer Function 1
// 千分位轉換
export function addComma(num) {
	// 分割整數部分和小數部分
	const parts = num.toString().split(".");
	// 整數部分添加逗號
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	// 將整數部分和小數部分組合起來
	return parts.join(".");
}

// Answer Function 2
// 出數字 0 到 20 間重疊與未包含的數字區間
export function getNumberIntervals(rangeArray, maxRange = 20) {
	// 轉化為一維陣列
	const totalNumbers = rangeArray.reduce((arr, next) => {
		if (arr.length === 0) arr = [...getSeqNumArray(next)]
		else arr = [...arr, ...getSeqNumArray(next)]
		return arr
	}, [])

	const totalNumString = totalNumbers.join(',') // 全數字合併轉字串 並以逗號區隔
	const multiple_numbers = [] // 所有重複數字
	const notHas_numbers = [] // 所有未包含數字
	for (let number = 0; number <= maxRange; number++) {
		const regex = new RegExp(`\\b${number}\\b`, `g`)
		const matches = totalNumString.match(regex)  // 以正規式判斷 字串內有多少當前數字
		if (!matches) { // 當完全無當前數字時
			notHas_numbers.push(number)
		} else if (matches.length > 1) { // 當前數字有重複時
			multiple_numbers.push(number)
		}
	}

	// numberArrToRanges 轉化為 二維陣列 數字區間 e.g. [[1,4], [5, 5]
	return {
		overlapNumSet: new Set(multiple_numbers),
		overlap: numberArrToRanges(multiple_numbers),
		notInclude: numberArrToRanges(notHas_numbers)
	}
}

// 產生連續數字
export function getSeqNumArray(range) {
	const [start, end] = range;
	if (start === '' || end === '') return []
	const length = end - start + 1;
	return Array.from({ length }, (value, index) => start + index);
}

// 連續數字一維陣列轉換為數字區間的二維陣列
export function numberArrToRanges(arr) {
	let result = [];
	let start = arr[0]; // 起始數字
	for (let i = 1; i < arr.length; i++) {
		// 如果當前數字不是連續的，將前一個連續範圍添加到結果中
		if (arr[i] !== arr[i - 1] + 1) {
			result.push([start, arr[i - 1]]);
			start = arr[i]; // 更新起始數字
		}
	}
	// 將最後一個連續範圍添加到結果中
	result.push([start, arr[arr.length - 1]]);
	if (result[0][0] === undefined || !result[0][1] === undefined) return []
	return result;
}
