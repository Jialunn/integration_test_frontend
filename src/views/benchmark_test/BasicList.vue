<template>
  <page-header-wrapper>
    <div v-for="(title, index) in barTitle" :key="index">
      <a-card style="margin-top: 24px" :bordered="false">
        <bar :data="metrics[index]" :title="title" />
      </a-card>
    </div>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="历史数据">

      <div slot="extra">
        <a-radio-group v-model="status" @change="successFilter(status)">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="success">成功</a-radio-button>
          <a-radio-button value="fail">失败</a-radio-button>
        </a-radio-group>
      </div>
      <a-table
        rowKey="key"
        :columns="columns"
        :data-source="chartData"
        :pagination="false"
        :scroll="{ x: 1000 }"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="onItemUpdate(record)">修改</a>
            <a-divider type="vertical" />
            <a @click="onItemDelete(record)">删除</a>
          </template>
        </span>
      </a-table>
      <pagination
        v-model="pagination.current"
        @change="pageChange"
        @showSizeChange="pageSizeChange"
        style="margin-top: 24px; align-content: center"
        size="small"
        :pageSize="pagination.pageSize"
        :pageSizeOptions="pagination.pageSizeOptions"
        :total="pagination.total"
        show-size-changer
        show-quick-jumper
        :show-total="total => `Total ${pagination.total} items`" />
    </a-card>
  </page-header-wrapper>
</template>

<script>
// 演示如何使用 this.$dialog 封装 modal 组件
import TaskForm from './modules/TaskForm'
import Info from './components/Info'
import { getModelHistory } from '@/api/benchmarkTest'
import { Bar, STable } from '@/components'

const columns = [
  {
    title: 'repo',
    dataIndex: 'repo',
    key: 'repo'
  },
  {
    title: 'branch(tag)',
    dataIndex: 'branch',
    key: 'branch'
  },
  {
    title: 'case',
    dataIndex: 'case',
    key: 'case'
  },
  {
    title: '测试版本',
    dataIndex: 'test_version',
    key: 'test_version'
  },
  {
    title: '测试时间',
    dataIndex: 'test_started_time',
    key: 'test_started_time'
  },
  {
    title: '测试状态',
    dataIndex: 'success',
    key: 'success'
  },
  {
    title: '测试结果',
    dataIndex: 'results',
    width: 400,
    key: 'results'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'ModelTestList',
  components: {
    STable,
    TaskForm,
    Info,
    Bar
  },
  data () {
    return {
      columns,
      pagination: {
        current: 1,
        position: 'top',
        pageSize: 10,
        total: 20,
        pageSizeOptions: ['5', '10', '20']
      },
      success: undefined,
      test_type: 'test',
      res: {},
      barTitle: [],
      chartData: [],
      metrics: [],
      status: 'all',
      repo: 'mmdetection',
      config: 'atss_r50_fpn_1x_coco'
    }
  },
  created () {
    if (String(this.$route.params.repo) !== 'undefined') {
      this.repo = this.$route.params.repo
    }
    if (String(this.$route.params.model) !== 'undefined') {
      this.model = this.$route.params.model
    }
    if (String(this.$route.params.pageNo) !== 'undefined') {
      this.current = this.$route.params.pageNo
    }
    if (String(this.$route.params.test_type) !== 'undefined') {
      this.test_type = this.$route.params.test_type
    }
    this.loadChartData()
  },
  methods: {
    loadChartData (success = this.success, page_size = this.pagination.pageSize, page = this.pagination.current, test_type = this.test_type, repo = this.repo, model = this.model) {
      const modelData = {
        'test_type': test_type,
        'page_size': page_size,
        'page': page,
        'repo': repo,
        'model': model,
        'success': success
      }
      getModelHistory(modelData)
      .then((res) => {
        this.res = res
        let head = ''
        // eslint-disable-next-line
        let title = []
        // eslint-disable-next-line
        let metrics = []
        // eslint-disable-next-line
        let chartData = []
        const d = JSON.parse(JSON.stringify(res.data))
        for (const i in d) {
          d[i].success = JSON.stringify(d[i].success)
          const date = new Date(d[i].test_started_time * 1000)
          const dateString = String(date.getFullYear()) + '_' +
                             String(date.getMonth() + 1) + '_' +
                             String(date.getDate())
          if (head === '') {
            head = d[i].case
          }
          Object.keys(d[i].results.metrics).forEach((key) => {
            if (key !== 'err') {
              let __key = key
              if (key.indexOf('/') !== -1) {
                __key = key.split('/')[1]
              }
              const name = head + ' : ' + d[i].results.dataset + ' : ' + __key
              if (title.indexOf(name) === -1) {
                title.push(name)
                metrics.push([])
              }
              const index = title.indexOf(name)
              metrics[index].push({
                x: dateString + ';' + date.getHours() + ':' + date.getSeconds(),
                y: Number(d[i].results.metrics[key])
              })
            }
          })
          // 加载表格数据 OHHHHHHHHHH
          d[i].results = JSON.stringify(d[i].results)
          d[i].test_started_time = dateString
          d[i].key = i
          chartData.push(d[i])
        }
        this.barTitle = title
        this.metrics = metrics
        this.chartData = chartData
        this.pagination.total = res.pageNum
        // this.pagenation.total = Math.ceil(res.pageNum / res.pageSize)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    pageChange (page, pageSize) {
      this.loadChartData()
    },
    pageSizeChange (_, pageSize) {
      this.pagination.pageSize = pageSize
      this.loadChartData()
    },
    successFilter (e) {
      if (e === 'all') {
        this.success = undefined
      }
      if (e === 'success') {
        this.success = true
      }
      if (e === 'fail') {
        this.success = false
      }
      this.pagination.current = 1
      this.loadChartData()
    },
    onItemUpdate (e) {
      console.log(e)
    },
    onItemDelete (e) {
      console.log(this.res.data[0].results.dataset)
      const id = e._id
      const dataList = this.res.data
      for (const j in dataList) {
        if (dataList[j]._id === id) {
          // deleteItemById
          console.log(1)
        }
      }
      this.loadChartData()
    }
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
}

.list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
        line-height: 20px;
    }
    p {
        margin-top: 4px;
        margin-bottom: 0;
        line-height: 22px;
    }
}
</style>
