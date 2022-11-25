<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="http://ci.pjlab.org.cn" target="_blank">CI 平台</a>
      <a href="http://dashborad.pjlab.org.cn" target="_blank">Dashboard</a>
      <a href="https://www.github.com/APX103/" target="_blank">@APX103</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
