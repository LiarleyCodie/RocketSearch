<script>
  import SearchInput from './lib/SearchInput.svelte'
  import RocketseatPlusLogo from './assets/rockeseatplus.svg'
</script>

<main class="main">
  <header class="header">
    <a href="https://www.rocketseat.com.br/">
      <img
        src={RocketseatPlusLogo}
        alt="Rocketseat Rocket with boost (plus icon)"
      />
    </a>
  </header>

  <h1>RocketSearch</h1>

  <SearchInput />
</main>

<style>
  .main {
    min-height: 100vh;
    min-width: 100vw;
    display: grid;
    justify-items: center;
    align-content: center;
    grid-template-rows: 12rem 1fr 3.2fr;
    gap: 3rem;
  }

  .main header {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-inline: 8rem;
  }

  .main img {
    height: 2.2rem;
  }

  .main h1 {
    font-size: 4.4rem;
    user-select: none;
    pointer-events: none;
    align-self: end;
  }

  @media screen and (max-width: 640px) {
    .main {
      padding-inline: 1.2rem;
    }

    .main header {
      padding-inline: 4rem;
    }
  }
</style>
