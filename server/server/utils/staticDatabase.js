import { randomUUID } from 'node:crypto'

/**
 * @param {string} text
 * @returns {string}
 */
let accentsRemover = (text) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export class StaticDatabase {
  #data = new Map()

  /**
   * Insert a data into the database
   * @param {Object} data - Object containing informations of the search query
   * @param {string} data.title - original title of the data
   * @param {string} data.localizableTitle - title without any special character (to facilitate the search)
   * @param {string} data.url - address to the content of the search query
   * @param {string} data.description - description of search query
   * @returns {void}
   */
  create(data) {
    const id = randomUUID()
    const _data = { ...data }
    if (!data.localizableTitle) {
      _data.localizableTitle = accentsRemover(_data.title)
    }
    this.#data.set(id, _data)
  }

  /**
   * @typedef {Object[]} Data
   * @property {string} id
   * @property {string} title
   * @property {string} localizableTitle
   * @property {string} url
   * @property {string} description
   */

  /**
   * @param {string} id - id of the data
   * @returns {Data} an array containing just one object containing all informations about this query
   */
  getSearchDataById(id) {
    return [{ id, ...this.#data.get(id) }]
  }

  /**
   *
   * @param {string} searchQuery - term that you're looking for
   * @param {number} length - amount of data that you want to fetch
   * @returns {Data}
   */
  getSearchDataByQuery(searchQuery, length) {
    let _data = []
    let _slicedData = []

    if (searchQuery && searchQuery != '') {
      _data = this.getManySearchData().filter((data) =>
        data.title.toUpperCase().includes(searchQuery.toUpperCase())
      )
    }

    if (length && _data.length > length) {
      const startId = Math.floor(Math.random() * _data.length)
      let currentId = startId
      for (let i = 0; i < length; i++) {
        if (currentId + 1 > length) currentId = 0
        _slicedData[i] = _data[currentId]
        currentId++
      }
      return _slicedData
    }

    return _data
  }

  /**
   * Returns many search data from the database
   * @param {number} length - amount of data returned
   * @returns {Data} an array containing many objects with search data
   */
  getManySearchData() {
    return Array.from(this.#data).map((data) => {
      return { id: data[0], ...data[1] }
    })
  }
}

// crud
