<script>
	export let name;
	export let client;
	console.log("Live from Amsterdam, it's Effect Network! 🔥️🔥️🔥️");
	console.log(client)
</script>

<section class="hero is-info is-fullheight">
	<div class="hero-head">
		<nav class="navbar">
			<div class="container">
				<div class="navbar-brand">
					<a class="navbar-item" href="../">
						<img src="favicon.png" alt="Logo">
						<p>Trending video analyzer</p>
					</a>
					<span class="navbar-burger burger" data-target="navbarMenu">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</div>
				<div id="navbarMenu" class="navbar-menu">
					<div class="navbar-end">
						<span class="navbar-item">
							<a class="button is-white is-outlined" href="#">
								<span class="icon">
									<i class="fa fa-home"></i>
								</span>
								<span>Home</span>
							</a>
						</span>
						<span class="navbar-item">
							<a class="button is-white is-outlined" href="https://github.com/BulmaTemplates/bulma-templates/blob/master/templates/landing.html">
								<span class="icon">
									<i class="fa fa-github"></i>
								</span>
								<span>View Source</span>
							</a>
						</span>
					</div>
				</div>
			</div>
		</nav>
		</div>

		<div class="hero-body">
			<div class="container has-text-centered">
				<div class="column is-6 is-offset-3">
					<h1 class="title">
						Trending Youtube videos
					</h1>
					<h2 class="subtitle">
					Performing sentiment analysis with the Effect Force WorkForce.
					</h2>
					<a class="button is-info" href="#">
						Login with EOS
					</a>
				</div>
			</div>
		</div>

</section>

<style type="text/scss">
@import "bulma/sass/utilities/_all";
@import "bulma/sass/base/_all";
@import "bulma/sass/elements/_all";
@import "bulma/sass/form/_all";
@import "bulma/sass/components/_all";
@import "bulma/sass/grid/_all";
@import "bulma/sass/helpers/_all";
@import "bulma/sass/layout/_all";

html,body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
.hero.is-info {
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url('https://unsplash.it/1200/900?random') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.hero .subtitle {
  padding: 3rem 0;
  line-height: 1.5;
}
</style>