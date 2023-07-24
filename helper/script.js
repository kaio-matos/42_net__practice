const inputIPV4 = document.getElementById('input-ipv4')
const inputIPV4Binary = document.getElementById('input-ipv4-binary')
const inputMask = document.getElementById('input-mask')
const inputMaskBinary = document.getElementById('input-mask-binary')
const inputMaskBinaryAmount = document.getElementById('input-mask-binary-amount')
const inputMaskBinaryAmountBinary = document.getElementById('input-mask-binary-amount-binary')
const inputNumber = document.getElementById('input-number')
const inputNumberBinary = document.getElementById('input-number-binary')

/**
 * @param {string[]} values
 * @returns {string}
 */
function getOctets(values) {
	const octets = values.map((value) => {
		const octet = parseInt(value).toString(2)
		const getZeros = (size = 8) => Array.from(Array(size)).map(() => '0').join('')

		if (isNaN(octet)) return getZeros()

		if (octet.length < 8) {
			return getZeros(8 - octet.length).concat(octet)
		}
		return octet
	})
	return octets.join('.')
}

/**
 * @param {string[]} octets
 * @returns {string}
 */
function getValues(octets) {
	const values = octets.map((octet) => {
		const value = parseInt(octet, 2)

		if (isNaN(value)) return 0

		if (value.length < 4) {
			return value.concat(getZeros(4 - value.length))
		}
		return value
	})
	return values.join('.')
}


//
// Decimal Notation
//

/**
 * @param {HTMLElementEventMap['keydown']} event
 */
function onChangeIP(event) {
	/**
	 * @type {string}
	 */
	const ip = event.currentTarget.value
	inputIPV4Binary.value = getOctets(ip.split('.'))
}

/**
 * @param {HTMLElementEventMap['keydown']} event
 */
function onChangeMask(event) {
	/**
	 * @type {string}
	 */
	const mask = event.currentTarget.value
	inputMaskBinary.value = getOctets(mask.split('.'))
}

//
// Binary Notation
//

/**
 * @param {HTMLElementEventMap['keydown']} event
 */
function onChangeIPBinary(event) {
	/**
	 * @type {string}
	 */
	const ip = event.currentTarget.value
	inputIPV4.value = getValues(ip.split('.'))
}

/**
 * @param {HTMLElementEventMap['keydown']} event
 */
function onChangeMaskBinary(event) {
	/**
	 * @type {string}
	 */
	const mask = event.currentTarget.value
	inputMask.value = getValues(mask.split('.'))
}

//
// Mask with amount of 1's
//

/**
 * @param {HTMLElementEventMap['keydown']} event
 */
function onChangeMaskBinaryAmount(event) {
	/**
	 * @type {string}
	 */
	let n = event.currentTarget.value
	if (!n) return inputMaskBinaryAmountBinary.value = 0

	n = n.replaceAll('/', '')

	const generateBinaryFromMask = (n) => {
		let array = []
		const MASK_MAX_LENGTH = 32
		const OCTET_LENGTH = 8
		for (let i = 0; i <= MASK_MAX_LENGTH; i++) {
			if (i !== MASK_MAX_LENGTH && i % OCTET_LENGTH === 0 && i !== 0) {
				array.push('.')
			}
			if (i < n) {
				array.push('1')
			} else if (i !== MASK_MAX_LENGTH) {
				array.push('0')
			}
		}
		return array.join('')
	}

	inputMaskBinaryAmountBinary.value = generateBinaryFromMask(n)
}

/**
 * @param {HTMLElementEventMap['keydown']} event
 */
function onChangeMaskBinaryAmountBinary(event) {
	/**
	 * @type {string}
	 */
	const n = event.currentTarget.value
	const generateMaskFromBinary = (n) => {
		n = n.replaceAll('0', '')
		n = n.replaceAll('.', '')
		return n.length
	}

	inputMaskBinaryAmount.value = generateMaskFromBinary(n)
}



//
// Simple Conversion
//

/**
 * @param {HTMLElementEventMap['keydown']} event
 */
function onChangeNumber(event) {
	/**
	 * @type {string}
	 */
	const n = event.currentTarget.value
	if (!n) return inputNumberBinary.value = 0
	inputNumberBinary.value = parseInt(n).toString(2)
}

/**
 * @param {HTMLElementEventMap['keydown']} event
 */
function onChangeNumberBinary(event) {
	/**
	 * @type {string}
	 */
	const n = event.currentTarget.value
	if (!n) return inputNumber.value = 0
	inputNumber.value = parseInt(n, 2)
}

