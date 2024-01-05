<script>
  import Icon from '@iconify/svelte'
</script>

<div class="searchbar-wrapper">
  <div class="searchbar">
    <!-- <form action="/search" method="get"> -->
    <button type="submit">
      <span class="icon search-icon"><Icon icon="tabler:search" /></span>
    </button>
    <input type="search" name="search" id="" />
    <button>
      <span class="icon"><Icon icon="pepicons-pencil:dots-y" /></span>
    </button>
    <!-- </form> -->
  </div>
</div>

<style>
  .searchbar-wrapper {
    width: 100%;
    max-width: 64rem;
  }

  .searchbar-wrapper .searchbar {
    display: flex;
    width: 100%;
    padding: 0.4rem 0.8rem;
    border-radius: 99rem;
    border: 1px solid rgba(255, 255, 255, 0.4);

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
      backdrop-filter;
    transition-duration: 200ms;

    overflow: hidden;
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
