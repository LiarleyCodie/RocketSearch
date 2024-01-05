<script>
  import Icon from '@iconify/svelte'
  let suggestionsVisible = true
</script>

<div class="searchbar-wrapper" data-suggestionsvisibility={suggestionsVisible}>
  <div class="searchbar">
    <!-- <form action="/search" method="get"> -->
    <button type="submit">
      <span class="icon search-icon"><Icon icon="tabler:search" /></span>
    </button>

    <input
      type="search"
      name="search"
      value="Onde encontrar as ediçoes passadas do NLW?"
    />

    <button>
      <span class="icon"><Icon icon="pepicons-pencil:dots-y" /></span>
    </button>
    <!-- </form> -->
  </div>
  {#if suggestionsVisible}
    <div class="searchsuggestions active">
      <ul>
        <li>
          <a href="#">
            <span class="icon search-icon"><Icon icon="tabler:search" /></span>
            NLW onde assistir</a
          >
        </li>
        <li>
          <a href="#">
            <span class="icon search-icon"><Icon icon="tabler:search" /></span>
            projetos NLW para codar</a
          >
        </li>
        <li>
          <a href="#">
            <span class="icon search-icon"><Icon icon="tabler:search" /></span>
            NLW rocketseat</a
          >
        </li>
        <li>
          <a href="#">
            <span class="icon search-icon"><Icon icon="tabler:search" /></span>
            Todas as NLW</a
          >
        </li>
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
    transition-property: backdrop-filter, background-color, border-color;
    transition-duration: 200ms;
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
    margin-right: 1.6rem;
    color: #626365;
  }

  /* Sarch input */
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

    transition-property: background-position, background-size, border-color,
      backdrop-filter, box-shadow;
    transition-duration: 200ms;

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

    background: rgb(107, 107, 107);
    background: linear-gradient(
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
