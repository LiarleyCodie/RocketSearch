<script>
  import { Route, Router, Link } from 'svelte-routing'
  import Home from './lib/Home.svelte'
  import Search from './lib/Search.svelte'
</script>

<Router>
  <Route path='/' component={Home}/>
  <Route path='/search' component={Search}/>
</Router>