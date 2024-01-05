import { randomUUID } from 'node:crypto'

export class StaticDatabase {
  #data = new Map()

  /**
   * Insert a data into the database
   * @param {Object} data - Object containing informations of the search query
   * @param {string} data.title - title of the search query
   * @param {string} data.url - address to the content of the search query
   * @param {string} data.description - description of search query
   * @returns {void}
   */
  create(data) {
    const id = randomUUID()
    this.#data.set(id, data)
  }

  /**
   * @typedef {Object[]} Data
   * @property {string} id
   * @property {string} title
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
   * @param {string} searchQuery
   * @returns {Data}
   */
  getSearchDataByQuery(searchQuery) {
    if (searchQuery != '') {
      return this.getManySearchData().filter((data) =>
        data.title.toUpperCase().includes(searchQuery.toUpperCase())
      )
    }
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
