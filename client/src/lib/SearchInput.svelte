<script>
  import Icon from '@iconify/svelte'
  import axios from 'axios'

  let suggestionsVisible = false

  let searchValue = ''

  /**
   * @param {string} text
   * @returns {string}
   */
  const accentsRemover = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  /**
   * @typedef {Object} Datas
   * @property {number} searched_data_amount
   * @property {Data[]} searched_data
   *
   * @typedef {Object} Data
   * @property {string} id
   * @property {string} title
   * @property {string} localizableTitle
   * @property {string} description
   * @property {string} url
   */
  /** @type{Datas} */
  let searchData = {
    searched_data: [],
    searched_data_amount: 0,
  }

  const toggleSuggestionsTray = () => {
    if (searchData.searched_data_amount) suggestionsVisible = true
    else suggestionsVisible = false
  }

  /** @param {KeyboardEvent} e */
  const handleInput = async (e) => {
    const { key } = e
    
    const allowedKeys = [
      'A','B','C','D','E','F','G','H','I','J','K','L','M','N',
      'O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1',
      '2','3','4','5','6','7','8','9', 'BACKSPACE'
    ]

    if (allowedKeys.includes(key.toUpperCase())) {
      await axios
      .get(`/api?search=${accentsRemover(searchValue.trim())}&length=5`)
      .then(({ data }) => {
        searchData = data

        toggleSuggestionsTray()
      })
      .catch((err) => console.error(err))
    }
  }
</script>

<div class="searchbar-wrapper" data-suggestionsvisibility={suggestionsVisible}>
  <div class="searchbar">
    <!-- <form action="/search" method="get"> -->
    <button type="submit">
      <span class="icon search-icon"><Icon icon="tabler:search" /></span>
    </button>
    <input
      on:keyup={handleInput}
      type="search"
      name="search"
      bind:value={searchValue}
    />

    <button>
      <span class="icon"><Icon icon="pepicons-pencil:dots-y" /></span>
    </button>
    <!-- </form> -->
  </div>
  {#if suggestionsVisible}
    <div class="searchsuggestions active">
      <ul>
       {#each searchData.searched_data as data}
        <li>
          <a href="{data.url}">
            <span class="icon search-icon"><Icon icon="tabler:search" /></span>
            {data.title}
          </a>
        </li>
       {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .searchbar-wrapper {
    width: 100%;
    max-width: 64rem;
    position: relative;
  }

  /* Search suggestions */
  .searchsuggestions {
    position: absolute;
    width: 100%;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;

    overflow: hidden;

    background: linear-gradient(
      45deg,
      rgba(107, 107, 107, 0.12) 43%,
      rgba(255, 184, 129, 0.19) 53%,
      rgba(255, 204, 165, 0.25) 60%,
      rgba(150, 150, 150, 0.12) 88%
    );
    box-shadow: 0 1rem 1rem -0.2rem rgba(0, 0, 0, 0.5);
  }

  .searchsuggestions ul {
    list-style-type: none;
  }

  .searchsuggestions ul li:last-child a {
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }

  .searchsuggestions ul li:last-child a:hover {
    border-bottom-color: white;
  }

  .searchsuggestions ul li a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.6);
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1.2rem;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    border-right: 1px solid rgba(255, 255, 255, 0.4);
  }

  .searchsuggestions ul li a:hover {
    color: white;
    border-left-color: white;
    border-right-color: white;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(0.25rem);
  }

  .searchsuggestions ul li a:hover .icon {
    color: #fff;
  }

  .searchsuggestions ul li a .icon {
    display: flex;
    font-size: 2.4rem;
    margin-inline: 0.2rem 1.4rem;
    color: #626365;
  }

  /* Search input */
  .searchbar-wrapper .searchbar {
    display: flex;
    width: 100%;
    padding: 0.4rem 0.8rem;
    border-radius: 99rem;
    border: 1px solid #ffffff66;

    background: rgb(107, 107, 107);
    background: linear-gradient(
      45deg,
      rgba(107, 107, 107, 0.12) 43%,
      rgba(255, 184, 129, 0.19) 53%,
      rgba(255, 204, 165, 0.25) 60%,
      rgba(150, 150, 150, 0.12) 88%
    );

    backdrop-filter: blur(0.25rem);

    overflow: hidden;
    position: relative;

    box-shadow: 0 1rem 1rem -0.2rem rgba(0, 0, 0, 0.5);
  }
  .searchbar-wrapper[data-suggestionsvisibility='true'] .searchbar::after {
    position: absolute;
    content: '';
    width: 90%;
    height: 0.1rem;
    background: #ffffff66;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  [data-suggestionsvisibility='true'] .searchbar:focus-within::after {
    background: white;
  }

  .searchbar-wrapper .searchbar:focus-within {
    border-color: white;

    background-color: rgba(0, 0, 0, 0.1);
    background-image: linear-gradient(
      45deg,
      rgba(107, 107, 107, 0.06206232492997199) 43%,
      rgba(255, 184, 129, 0.19) 53%,
      rgba(255, 218, 190, 0.28) 60%,
      rgba(150, 150, 150, 0.05926120448179273) 88%
    );
    background-size: 95% 100%;
    background-position-x: 50%;

    backdrop-filter: blur(0.4rem);
    box-shadow: 0 1rem 1rem -0.5rem rgba(0, 0, 0, 0.5);
  }

  .searchbar-wrapper[data-suggestionsvisibility='true'] .searchbar {
    box-shadow: none;
    border-bottom: none;
    border-radius: 0;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }
  .searchbar-wrapper input[type='search'],
  .searchbar-wrapper button {
    background: transparent;
    border: none;
    color: white;
  }

  .searchbar-wrapper input[type='search'] {
    padding: 0.8rem;
    flex: 1;
    outline: none;
  }

  /* clears the 'X' from IE */
  .searchbar-wrapper input[type='search']::-ms-clear,
  .searchbar-wrapper input[type='search']::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }

  /* clears the 'X' from Chrome */
  .searchbar-wrapper input[type='search']::-webkit-search-decoration,
  .searchbar-wrapper input[type='search']::-webkit-search-cancel-button,
  .searchbar-wrapper input[type='search']::-webkit-search-results-button,
  .searchbar-wrapper input[type='search']::-webkit-search-results-decoration {
    display: none;
  }

  .searchbar-wrapper button {
    display: flex;
    padding: 0.6rem;
    align-items: center;
    justify-content: center;
  }
  .searchbar-wrapper button .icon {
    display: flex;
    font-size: 2.8rem;
    opacity: 0.4;
  }
  .searchbar-wrapper .searchbar:focus-within button .search-icon {
    color: #ff795b;
    opacity: 1;
  }
  .searchbar-wrapper button .search-icon {
    font-size: 2.4rem;
  }
  .searchbar-wrapper button:hover .icon {
    opacity: 1;
  }
</style>
