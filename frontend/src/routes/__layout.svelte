<script>
  import "../app.scss";
</script>
<section class="hero is-primary is-fullheight">
	<div class="hero-head">
		<nav class="navbar">
			<div class="container">
				<div class="navbar-brand">
					<a class="navbar-item" href="/">
						<img src="favicon.ico" alt="Logo">
						<p>The Unwise Owl</p>
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
							<a class="button is-white is-outlined" href="/">
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
		<slot />	
	</div>
</section>

<style lang="scss">
  html,body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
.hero {
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
