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

      <a-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data-source="dataSource"
        showPagination="auto"
      ></a-table>
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

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '吴彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
]

// const columns2 = [
//   {
//     title: 'repo',
//     dataIndex: 'repo',
//     key: 'repo'
//   },
//   {
//     title: 'branch',
//     dataIndex: 'branch',
//     key: 'branch'
//   },
//   {
//     title: 'case',
//     dataIndex: 'case',
//     key: 'case'
//   },
//   {
//     title: '测试版本',
//     dataIndex: 'version',
//     key: 'version'
//   },
//   {
//     title: '测试时间',
//     dataIndex: 'test_version',
//     key: 'test_version'
//   },
//   {
//     title: '测试状态',
//     dataIndex: 'success',
//     key: 'success'
//   },
//   {
//     title: '测试结果',
//     dataIndex: 'results',
//     key: 'results'
//   }
// ]

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
      status: 'all',
      dataSource
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
