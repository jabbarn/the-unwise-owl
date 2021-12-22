<script>
  import { apiData } from '../store.js';
  
  let data = {};
  let loading = false;
  function onSubmit(e) {
    loading = true
    const formData = new FormData(e.target);

    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    // Make your API call (which takes +1.5 seconds else the loading is *too* fast)
    setTimeout(()=> {
      fetch(`https://newsapi.org/v2/everything?q=${data['newsQuery']}&language=en&apiKey=57552cd230024d39880cdc6606b8de5e`)
      .then(response => {
        // Parse response as json
        return response.json()
      })
      .then(data => {
        // Console logging for debug purposes
        console.log("Data", data);
        // Save data to store
        apiData.set(data); 
      }).catch(error => {
        // Do error handling
        console.error("Error", error);
        return [];
      }).finally( () => {
        loading = false
      });
    }, 1500);
  }
</script>

<div class="container has-text-centered">
  <div class="column is-6 is-offset-3 box p-5">
    <h1 class="title">Getting started.</h1>
    <form on:submit|preventDefault={onSubmit} class="block">
      <label for="newsQuery" class="label">Find your news article.</label>
      <div class="field has-addons">
        <div class="control is-fullwidth">
            <input class="input" id="newsQuery" name="newsQuery" type="text" placeholder="News title or keywords... ">
        </div>
        <div class="control is-full-width">
          <button class="button is-primary" class:is-loading={loading === true} type="submit">
            <span class="icon">
              <i class="fa fa-search"></i>
            </span>
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

<style type="text/scss">
    @import '../src/app.scss';
    .box .title {
        color: $black;
    }
    .is-fullwidth {
        width: 100%;
    }
</style>