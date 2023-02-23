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
      title="历史数据">

      <div slot="extra">
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>

      <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadData"
          :alert="true"
          :rowSelection="rowSelection"
          showPagination="auto"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="status" slot-scope="text">
            <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
          </span>
          <span slot="description" slot-scope="text">
            <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
          </span>

          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="handleEdit(record)">配置</a>
              <a-divider type="vertical" />
              <a @click="handleSub(record)">订阅报警</a>
            </template>
          </span>

        </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
// 演示如何使用 this.$dialog 封装 modal 组件
import TaskForm from './modules/TaskForm'
import Info from './components/Info'
import { axios } from '@/utils/request'
import { Bar } from '@/components'

const data = []
data.push({
  title: 'Alipay',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  description: '那是一种内在的东西， 他们到达不了，也无法触及的',
  owner: '付晓晓',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 90
  }
})

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '规则编号',
    dataIndex: 'no'
  },
  {
    title: '描述',
    dataIndex: 'description',
    scopedSlots: { customRender: 'description' }
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: true,
    needTotal: true,
    customRender: (text) => text + ' 次'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
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
      data,
      columns,
      model_data: {
        'test_type': 'test',
        'page': '0',
        'repo': 'mmdetection',
        'config': 'configs/atss/atss_r50_fpn_1x_coco.py'
      },
      barTitle: [],
      chartData: [],
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
    loadChartData () {
      axios.post('http://10.1.52.78:5158/benchmark_test/get_model_history', this.model_data)
      .then((res) => {
        let head = ''
        // eslint-disable-next-line
        let title = []
        // eslint-disable-next-line
        let metrics = []
        const d = res.data
        for (const i in d) {
          if (head === '') {
            head = d[i].case
          }
          Object.keys(d[i].results.metrics).forEach((key) => {
            if (key !== 'err') {
              const name = head + ' : ' + key
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
        }
        this.barTitle = title
        this.metrics = metrics
      })
      .catch((error) => {
        console.log(error)
      })
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
