<script>
  import { each } from 'svelte/internal';
  import { apiData, articles, acc, client, tasksData, tasks } from '../store.js';
  let data = {};
  let loading = false;
  let message = '';
  let processData = false;
  let templateContent;

  fetch('campaign.html.template')
  .then(response => {
    return response.text()
  })
  .then(data => {
    templateContent = data;
  })

  let campaignToIPFS = {
    title: 'Unwise Owl: Analysis on English news articles.',
    description: 'What the Unwise Owl is trying to obtain is relevant data from news articles, this could be sentiment analysis or even determining the narrative of news articles.',
    instructions: 'Before reading the news article, please examine the title, description and image of the news article. After examining the article, read it and eventually answer the questions.',
    template: templateContent,
    image: 'https://github.com/twitter/twemoji/blob/master/assets/svg/1f989.svg',
    category: 'General Analysis',
    example_task: {
      'article_url': 'https://www.usatoday.com/story/news/health/2021/12/24/omicron-covid-surge-canceled-flights/9008997002/',
     },
    version: 1,
    reward: 1
  };

  const onSubmit = async (e) => {
    loading = true
    tasksData.set([]);
    const formData = new FormData(e.target);

    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    if(Object.keys($acc).length != 0) {
      const res = await $client.connectAccount($acc.provider, $acc.accountData);
      console.log('ACC RES 2:', res);
    }

    if(data.newsQuery) {
      // Make your API call (which takes +1.5 seconds else the loading is *too* fast)
      setTimeout(()=> {
        fetch(`https://newsapi.org/v2/everything?q=${data['newsQuery']}&language=en&apiKey=57552cd230024d39880cdc6606b8de5e`)
        .then(response => {
          // Parse response as json
          return response.json()
        })
        .then(data => {
          apiData.set(data); 
        }).catch(error => {
          // Do error handling
          console.error("Error", error);
          return [];
        }).finally(() => {
          loading = false
        });
      }, 1500);
    }
  }

function add(e) {
  let removeButton = e.currentTarget.parentElement.querySelector('button.is-danger');

  if (removeButton.classList.contains('is-active')) {
    removeButton.classList.replace('is-active', 'is-outlined');
  }
  e.currentTarget.classList.replace('is-outlined', 'is-active');
  let el = e.currentTarget.parentElement.parentElement.querySelector('div.column.is-10>p>a');
  let index = $tasksData.indexOf(el.href);
  if(index == -1) {
    $tasksData.push(el.href);
    tasksData.set($tasksData)
  }
}
function remove(e) {

  let addButton = e.currentTarget.parentElement.querySelector('button.is-primary');
  
  if (addButton.classList.contains('is-active')) {
    addButton.classList.replace('is-active', 'is-outlined');
  }
  e.currentTarget.classList.replace('is-outlined', 'is-active');
  let el = e.currentTarget.parentElement.parentElement.querySelector('div.column.is-10>p>a');
  let index = $tasksData.indexOf(el.href);
  if (index > -1) {
    $tasksData.splice(index, 1);
    tasksData.set($tasksData)
  }
}

const process = async () => {
  message = 'Making campaign..';
  processData = true;

  // const campaignResponse = await $client.force.makeCampaign(campaignToIPFS, 1);
  // console.log('RESPONSE: ', campaignResponse);
  // await $client.force.waitTransaction(campaignResponse);
  console.log($acc);
  const myCampaign = await $client.force.getMyLastCampaign();

  if(myCampaign){
    message = 'Making batch of news articles..';
    console.log('CAMPAIGN: ', myCampaign)
    let batch = {
      'tasks': []
    };

    $tasks.forEach(task => {
      batch.tasks.push({
        'article_url': task
      })
    })
    console.log("CONTENT: ", batch)
    const batchResponse = await $client.force.createBatch(myCampaign.id, batch, 1)
    console.log('BATCH: ', batchResponse)
    await $client.force.waitTransaction(batchResponse);
    processData = false;
  }
}
</script>
<div class="pageloader" class:is-active={processData === true}>
  <span class="title is-size-5">{message}</span>
</div>

<div class="container has-text-centered">
  <div class="column is-6 is-offset-3 box p-5">
    <h1 class="title">Getting started.</h1>
    {#if Object.keys($acc).length != 0}
    <form on:submit|preventDefault={onSubmit} class="block">
      <label for="newsQuery" class="label">Pick your news articles.</label>
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
    {:else}
    <p class="mb-2">Before continuing, please login by connecting with anchor.</p>
    {/if}
  </div>
  {#if $articles && $tasksData.length > 0}
  <div class="column is-6 is-offset-3 box p-5 has-text-left">
    <div class="columns">
      <div class="column is-10 is-flex is-align-items-center">
        <p class="is-size-5">
          <b>{$tasks.length} </b>
           <span>Articles selected.</span>
        </p>
      </div>
      <div class="column is-2">
        <button class="button is-info" on:click={process}>
          <span>Next</span>
          <span class="icon">
            <i class="fa fa-caret-right"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
  {/if}
  {#each $articles as article, itr}
  <div class="column is-6 is-offset-3 box p-5 has-text-left">
    <div class="columns">
      <div class="column is-10 is-flex is-align-items-center">
        <p>
          <b>{itr+1}. </b>
          <a href={article.url} class="is-link" target="_blank" >
            {#if article.shortTitle !== null}
                  {article.shortTitle}
              {:else}
                  {article.title}
            {/if}
          </a>
        </p>
      </div>
      <div class="column is-2 is-flex is-justify-content-space-between">
        <button class="button is-primary is-outlined" on:click={add} type="submit">
          <span class="icon">
            <i class="fa fa-check"></i>
          </span>
        </button>
        <button class="button is-danger is-outlined" on:click={remove} type="submit">
          <span class="icon">
            <i class="fa fa-times"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
  {/each}
</div>

<style type="text/scss">
    @import '../src/app.scss';

    .pageloader .title {
      color: $white;
    }
    .box .title {
        color: $black;
    }
    .is-fullwidth {
        width: 100%;
    }
    a.is-link {
      color: $link !important;
    }
</style>