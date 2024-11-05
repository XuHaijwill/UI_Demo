<template>
  名称:
  <el-autocomplete v-model="searchname" :fetch-suggestions="querySearchAsync" placeholder="请输入名称:" clearable></el-autocomplete>
</template>
<script>
export default {
  name: "inputSearch",
  url: "",
  mounted: function () {
    this.loadAll();
  },
  data() {
    return {
      //input远程搜索
      searchname: "",
      restaurants: [],
      timeout: null,
      uploading: false,
    };
  },
  methods: {
    //名称输入搜索
    loadAll() {
      fetch('./TestSearch.json')
        .then((res) => res.json())
        .then((data) => {
          console.info("test",data);
          console.info(data.data.code)
        if (data.data.code == 200) {
          var data2 = [];
          data.data.data.map((value) => {
            data2.push({
              id: value.id,
              value: value.platformName,          //重新修改后台返回来的Key名
            });
          });
          this.restaurants = data2;
        } else {
          this.$message.info("暂无数据");
        }
      });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
  }
}
</script>
