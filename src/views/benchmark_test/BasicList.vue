<template>
  <page-header-wrapper>
    <!-- <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <info title="我的待办" value="8个任务" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="本周任务平均处理时间" value="32分钟" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="本周完成任务数" value="24个" />
        </a-col>
      </a-row>
    </a-card> -->

    <div v-for="(title, index) in barTitle" :key="index">
      <a-card style="margin-top: 24px" :bordered="false">
        <bar :data="metrics[index]" :title="title" />
      </a-card>
    </div>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="历史数据(500条)">

      <div slot="extra">
        <a-radio-group v-model="status" @change="successFilter(status)">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="success">成功</a-radio-button>
          <a-radio-button value="fail">失败</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>
      <!-- <div slot="extra">
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div> -->
      <a-table
        rowKey="key"
        :columns="columns"
        :data-source="chartData"
      >
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
// 演示如何使用 this.$dialog 封装 modal 组件
import TaskForm from './modules/TaskForm'
import Info from './components/Info'
import { axios } from '@/utils/request'
import { Bar } from '@/components'

const columns = [
  {
    title: 'repo',
    dataIndex: 'repo',
    key: 'repo'
  },
  {
    title: 'branch',
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
    key: 'results'
  }
]

export default {
  name: 'StandardList',
  components: {
    TaskForm,
    Info,
    Bar
  },
  data () {
    return {
      columns,
      pagenation: false,
      pagenation1: {
        position: 'top',
        pageSize: 5,
        total: 10,
        pageSizeOptions: ['5', '10', '20'],
        defaultCurrent: 1,
        defaultPageSize: 5
      },
      barTitle: [],
      chartData: [],
      metrics: [],
      status: 'all'
    }
  },
  created () {
    this.loadChartData()
  },
  methods: {
    add () {
      this.$dialog(TaskForm,
        // component props
        {
          record: {},
          on: {
            ok () {
              console.log('ok 回调')
            },
            cancel () {
              console.log('cancel 回调')
            },
            close () {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '新增',
          width: 700,
          centered: true,
          maskClosable: false
        })
    },
    edit (record) {
      console.log('record', record)
      this.$dialog(TaskForm,
        // component props
        {
          record,
          on: {
            ok () {
              console.log('ok 回调')
            },
            cancel () {
              console.log('cancel 回调')
            },
            close () {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '操作',
          width: 700,
          centered: true,
          maskClosable: false
        })
    },
    loadChartData (success = undefined, page_size = '500', page = '1', test_type = 'test', repo = 'mmdetection', config = 'configs/atss/atss_r50_fpn_1x_coco.py') {
      const modelData = {
        'test_type': test_type,
        'page_size': page_size,
        'page': page,
        'repo': repo,
        'config': config,
        'success': success
      }
      axios.post('http://10.1.52.78:5158/benchmark_test/get_model_history', modelData)
      .then((res) => {
        let head = ''
        // eslint-disable-next-line
        let title = []
        // eslint-disable-next-line
        let metrics = []
        // eslint-disable-next-line
        let chartData = []
        const d = res.data
        for (const i in d) {
          if (head === '') {
            head = d[i].case
          }
          Object.keys(d[i].results.metrics).forEach((key) => {
            if (key !== 'err') {
              let __key = key
              if (key.indexOf('/') !== -1) {
                __key = key.split('/')[1]
              }
              const name = head + ' : ' + __key
              if (title.indexOf(name) === -1) {
                title.push(name)
                metrics.push([])
              }
              const index = title.indexOf(name)
              metrics[index].push({
                x: d[i].branch + ';' + d[i].test_version,
                y: d[i].results.metrics[key]
              })
            }
          })
          // 加载表格数据 OHHHHHHHHHH
          d[i].results = JSON.stringify(d[i].results)
          d[i].success = JSON.stringify(d[i].success)
          const date = new Date(d[i].test_started_time * 1000)
          const dateString = String(date.getFullYear()) + '_' +
                       String(date.getMonth() + 1) + '_' +
                       String(date.getDate())
          d[i].test_started_time = dateString
          d[i].key = i
          chartData.push(d[i])
        }
        this.barTitle = title
        this.metrics = metrics
        this.chartData = chartData
        // this.pagenation.total = Math.ceil(res.pageNum / res.pageSize)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    pageChange () {
      this.loadChartData()
    },
    successFilter (e) {
      if (e === 'all') {
        this.loadChartData()
      }
      if (e === 'success') {
        this.loadChartData(true)
      }
      if (e === 'fail') {
        this.loadChartData(false)
      }
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
