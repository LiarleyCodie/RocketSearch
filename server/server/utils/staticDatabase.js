import { randomUUID } from 'node:crypto'

/**
 * @param {any[]} array
 * @returns {any[]}
 * */
let shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

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
    // Algorithm improved with the help of my dear friend Éllie (or ChatGPT)
    const keywords = searchQuery.trim().toLowerCase().split(/\s+/)

    let filteredData = this.getManySearchData().filter((data) => {
      return keywords.some((keyword) =>
        data.localizableTitle.toLowerCase().includes(keyword)
      )
    })

    filteredData = shuffleArray(filteredData)

    return length ? filteredData.slice(0, length) : filteredData
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
