<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <h1 style="font-size: 35px;font-weight: bolder;">测试历史记录</h1>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false">

      <div slot="extra">
        <a-radio-group v-model="status" @change="successFilter(status)">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="test">测试</a-radio-button>
          <a-radio-button value="train">训练</a-radio-button>
        </a-radio-group>
      </div>
      <a-table
        rowKey="key"
        onRow="onItemClick"
        :columns="columns"
        :data-source="chartData"
        :pagination="false"
        :scroll="{x: 1100}">
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="onItemClick(record)">详情</a>
            <a-divider type="vertical" />
            <a @click="onItemClick(record)">导出</a>
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
import { getTestList } from '@/api/benchmarkTest'
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
    title: '总用例数',
    dataIndex: 'cases_count',
    key: 'cases_count'
  },
  {
    title: '测试用例数',
    dataIndex: 'cases_test',
    key: 'cases_test'
  },
  {
    title: '成功用例数',
    dataIndex: 'cases_success',
    key: 'cases_success'
  },
  // {
  //   title: '集群编号',
  //   dataIndex: 'cluster_num',
  //   key: 'cluster_num'
  // },
  // {
  //   title: '测试分区名',
  //   dataIndex: 'partition',
  //   key: 'partition'
  // },
  {
    title: '测试类型',
    dataIndex: 'task_type',
    key: 'task_type'
  },
  {
    title: '测试版本',
    dataIndex: 'test_version',
    key: 'test_version',
    width: 250
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
  // {
  //   title: '测试开始时间',
  //   dataIndex: 'start_time',
  //   key: 'start_time'
  // },
  // {
  //   title: '测试结束时间',
  //   dataIndex: 'end_time',
  //   key: 'end_time'
  // }

]

export default {
  name: 'TestList',
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
      mode: undefined,
      chartData: [],
      status: 'all'
    }
  },
  created () {
    this.loadChartData()
  },
  methods: {
    loadChartData (test_type = undefined, page_size = this.pagination.pageSize, page = this.pagination.current) {
      const modelData = {
        'test_type': test_type,
        'page_size': page_size,
        'page': page
      }
      getTestList(modelData)
        .then((res) => {
          // eslint-disable-next-line
          let metrics = []
          // eslint-disable-next-line
          let chartData = []
          const d = res.data
          for (const i in d) {
            d[i].success = JSON.stringify(d[i].success)
            const date = new Date(d[i].test_started_time * 1000)
            const dateString = String(date.getFullYear()) + '_' +
              String(date.getMonth() + 1) + '_' +
              String(date.getDate())
            // 加载表格数据 OHHHHHHHHHH
            d[i].results = JSON.stringify(d[i].results)
            d[i].test_started_time = dateString
            d[i].key = i
            chartData.push(d[i])
          }
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
        this.mode = undefined
      }
      if (e === 'test') {
        this.mode = 'test'
      }
      if (e === 'train') {
        this.mode = 'train'
      }
      this.pagination.current = 1
      this.loadChartData(this.mode)
    },
    onItemClick (e) {
      const repo = e.repo
      const version = e.test_version
      this.$router.push('/benchmark_test/table-list/' + repo + '/' + version)
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
