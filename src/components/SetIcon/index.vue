<template>
  <div class="Iconbody">
    <ul class="icon-list">
      <li
        v-for="(item,index) in IconList"
        :key="index"
        @click="SelectIcon(item,index)"
        :class="{clicked:selctindex==index}"
      >
        <span>
          <i :class="item.iconclass"></i>
          <span class="icon-name">{{item.iconclass}}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import { GetIcon } from "@/api/Icon";
export default {
  props: {
    Seticonclass: {
      type: String
    }
  },
  data() {
    return {
      IconList: [],
      selctindex: 0
    };
  },
  mounted() {
    this.IconList = GetIcon().data;
  },
  methods: {
    SelectIcon(item, index) {
      this.$emit("update:Seticonclass", item.iconclass);
      this.selctindex = index;
    }
  }
};
</script>
<style lang="scss">
.SetIcon {
  .Iconhead {
    p:last-child {
      cursor: pointer;
      i {
        font-size: 16px;
      }
    }
    & p:last-child:hover {
      color: #409eff;
    }
  }
  .Iconbody {
    max-height: 300px;
    margin-top: 10px;
    overflow: auto;
  }
  ul.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0 !important;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    margin: 0;
    li {
      float: left;
      width: 25%;
      text-align: center;
      height: 100px;
      line-height: 88px;
      color: #666;
      font-size: 13px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      // margin-right: -1px;
      margin-bottom: -1px;
      span {
        line-height: normal;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
          Microsoft YaHei, SimSun, sans-serif;
        color: #99a9bf;
        transition: color 0.15s linear;
        display: inline-block;
        vertical-align: middle;
      }
      i {
        display: block;
        font-size: 32px;
        margin-bottom: 15px;
        color: #606266;
        transition: color 0.15s linear;
      }
      .icon-name {
        display: inline-block;
        padding: 0 3px;
        height: 1em;
      }
    }
    li:hover,
    li.clicked {
      span,
      i {
        color: #409eff;
      }
    }
  }
}
</style>