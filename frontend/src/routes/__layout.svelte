<script context="module">
import "../app.scss";


/**
 * TODO: Need to find a better way of doing this.
**/
JSON.stringify_incl_func = function(value) {
    return JSON.stringify(value, function(key, val) {
        return (typeof val === 'function') ? val.toString().replace(/\t|\n/g, '') : val;
    });
}

JSON.parse_incl_func = function(value) {
    return JSON.parse(value, function(key, val) {
        if (typeof val === 'string') {
            var regex = /^function\s*\([^()]*\)\s*{.*}$/;

            if (regex.exec(val) !== null)
                return eval('key = ' + val);
            else
                return val;
        } else
            return val;
    });
}
</script>

<script>
import { accData, acc, client, provider} from '../store.js';

export const connectEOS = async () => {
  let connectAccount = { providerName: undefined, provider: undefined, accountData: undefined }
  const transport = new AnchorLinkBrowserTransport()
  const alink = new AnchorLink({
    transport,
    chainId: '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840',
    rpc: 'https://jungle3.greymass.com',
    chains: [{
      chainId: '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840',
      nodeUrl: 'https://jungle3.greymass.com',
    }],
  })
  // Perform the login, which returns the users identity
  const { session } = await alink.login('the-unwise-owl');

  const signatureProvider = session.makeSignatureProvider()
  const accountObj = { accountName: session.auth.actor.toString(), permission: session.auth.permission.toString() }
  connectAccount.provider = signatureProvider
  connectAccount.accountData = accountObj
  connectAccount.providerName = 'anchor'
  accData.set(connectAccount)
  const res = await $client.connectAccount($acc.provider, $acc.accountData);
  console.log('ACC RES:', res);
}

const logout = () => {
  accData.set(null);
}
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
						{#if Object.keys($acc).length == 0}
						<span class="navbar-item">
							<a class="button is-white is-outlined" on:click={connectEOS} href="#">
								<span class="icon">
									<i class="fa fa-user"></i>
								</span>
								<span>Connect with Anchor</span>
							</a>
						</span>
            {:else}
						<span class="navbar-item">
						  {$acc.accountData?.accountName}
						</span>
            <span class="navbar-item">
							<a class="button is-warning is-outlined" on:click={logout} href="#">
								<span>Logout</span>
							</a>
						</span>
						{/if}
						<span class="navbar-item">
							<a class="button is-white is-outlined" target="_blank" href="https://github.com/jabbarn/the-unwise-owl">
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
