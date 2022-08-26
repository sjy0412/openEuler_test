<template>
  <div class="process-line">
    <div
      v-for="(item, index) in statusList"
      :key="index"
      :class="[
        'status-step',
        item.status === 'success' ? 'success' : '',
        statusList.length > 6 ? 'step-width' : '',
      ]"
    >
      <div :class="['step-index', item.status === 'active' ? 'active1' : '']">
        <span :class="item.status === 'active' ? 'active2' : ''">{{
          index + 1
        }}</span>
      </div>
      <span :class="item.status === 'active' ? 'active-text' : ''">{{
        item.text
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProcessLine",
  props: ["statusList"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.process-line {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #4f5661;
  font-family: HarmonyOS_Sans_SC;

  .status-step::after {
    content: "";
    width: 100px;
    height: 1px;
    margin: 4px 10px;
    background: #c3cedf;
    display: inline-block;
  }
  .step-index {
    border: 1px solid #c3cedf;
    border-radius: 50%;
    width: 20px;
    color: #c3cedf;
    margin-right: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    font-size: 12px;
    font-family: HarmonyOS_Sans_SC;
  }
  .status-step:last-child::after {
    width: 0;
  }
  .step-width::after {
    width: 24px;
    margin: 4px 8px;
  }
  .success::after {
    background: #07f;
  }
  .success {
    color: #000;
    .step-index {
      border: 1px solid #07f;
      color: #07f;
      background: #e6f2ff;
    }
  }
  .active1 {
    border: 1px solid #07f;
    color: #07f;
  }
  .active2 {
    background: #07f;
    border-radius: 50%;
    width: 14px;
    line-height: 14px;
    color: #fff;
    text-align: center;
  }
  .active-text {
    color: #000;
  }
}
</style>
