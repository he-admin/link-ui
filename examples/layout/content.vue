<template>
  <doc-header></doc-header>
  <div>
    <nav-slider></nav-slider>
    <router-view/>
  </div>
</template>

<script>
import DocHeader from './header';
import NavSlider from './nav-slide';

export default {
  name: "content",
  components: {
    DocHeader,
    NavSlider
  }
}
</script>

<style lang="less">
.market-doc-container {
  //padding: 50px;
  flex: 1;

  > h1, > h2, > h3, > h4, > h5, > h6 {
    font-weight: 400;
    margin: 12px 0;
  }

  > h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
  }

  > h3 {
    margin: 40px 0 0;
    font-size: 22px;
  }

  > table {
    width: 100%;
    margin-top: 20px;
    border: 1px solid #EBEEF5;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    background: #fff;

    th, td {
      padding: 10px;
      border: 1px solid #EBEEF5;
      font-size: 14px;
      font-weight: normal;
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    }

    th {
      font-weight: bold;
      background: #fafafa;
    }
  }

  > p {
    margin-top: 10px;
  }

  > pre {
    margin-top: 20px;
    padding: 20px 10px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background: #fafafa;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;

    code {
      font-size: 14px;
      font-weight: normal;
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      background: transparent;
    }
  }
}
</style>
