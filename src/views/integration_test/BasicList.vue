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
      title="标准列表">

      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="processing">进行中</a-radio-button>
          <a-radio-button value="waiting">等待中</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>

      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="add">添加</a-button>
      </div>

      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="edit(item)">编辑</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>编辑</a></a-menu-item>
                <a-menu-item><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span>开始时间</span>
              <p>{{ item.startAt }}</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
// 演示如何使用 this.$dialog 封装 modal 组件
import TaskForm from './modules/TaskForm'
import Info from './components/Info'
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

const resData = {
  'code': 0,
  'data': [
    {
      '_id': '63e202518fac92b83686a7e8',
      'repo': 'mmdetection',
      'branch': 'dev-3.x',
      'case': 'atss_r50_fpn_1x_coco',
      'config': 'configs/atss/atss_r50_fpn_1x_coco.py',
      'test_version': 'benchmark_20230207',
      'test_started_time': 1675756113,
      'success': false,
      'results': {
        'dataset': 'coco',
        'eval': [
          'bbox'
        ],
        'metrics': {
          'coco/bbox_mAP': '0.3790'
        }
      }
    },
    {
      '_id': '63e21702e0b38d66629aa683',
      'repo': 'mmdetection',
      'branch': 'dev-3.x',
      'case': 'atss_r50_fpn_1x_coco',
      'config': 'configs/atss/atss_r50_fpn_1x_coco.py',
      'test_version': 'benchmark_test_1715',
      'test_started_time': 1675761410,
      'success': false,
      'results': {
        'dataset': 'coco',
        'eval': [
          'bbox'
        ],
        'metrics': {
          'err': 'can not get metric'
        }
      }
    },
    {
      '_id': '63e337c7977545d62018937f',
      'repo': 'mmdetection',
      'branch': 'dev-3.x',
      'case': 'atss_r50_fpn_1x_coco',
      'config': 'configs/atss/atss_r50_fpn_1x_coco.py',
      'test_version': 'benchmark_20230208',
      'test_started_time': 1675835335,
      'success': true,
      'results': {
        'dataset': 'coco',
        'eval': [
          'bbox'
        ],
        'metrics': {
          'coco/bbox_mAP': '0.4340'
        }
      }
    },
    {
      '_id': '63e34a08d340d8966a498444',
      'repo': 'mmdetection',
      'branch': 'dev-3.x',
      'case': 'atss_r50_fpn_1x_coco',
      'config': 'configs/atss/atss_r50_fpn_1x_coco.py',
      'test_version': 'benchmark_20230207_2',
      'test_started_time': 1675840008,
      'success': false,
      'results': {
        'dataset': 'coco',
        'eval': [
          'bbox'
        ],
        'metrics': {
          'coco/bbox_mAP': '0.3860'
        }
      }
    },
    {
      '_id': '63e371b44537899acedb8811',
      'repo': 'mmdetection',
      'branch': 'dev-3.x',
      'case': 'atss_r50_fpn_1x_coco',
      'config': 'configs/atss/atss_r50_fpn_1x_coco.py',
      'test_version': 'benchamrk_20230208_2',
      'test_started_time': 1675850164,
      'success': false,
      'results': {
        'dataset': 'coco',
        'eval': [
          'bbox'
        ],
        'metrics': {
          'err': 'can not get metric'
        }
      }
    },
    {
      '_id': '63e38a89071d384979040458',
      'repo': 'mmdetection',
      'branch': 'dev-3.x',
      'case': 'atss_r50_fpn_1x_coco',
      'config': 'configs/atss/atss_r50_fpn_1x_coco.py',
      'test_version': 'benchmark_demo',
      'test_started_time': 1675856521,
      'success': true,
      'results': {
        'dataset': 'coco',
        'eval': [
          'bbox'
        ],
        'metrics': {
          'coco/bbox_mAP': '0.3950'
        }
      }
    },
    {
      '_id': '63e492927cedda98f5d6022e',
      'repo': 'mmdetection',
      'branch': 'dev-3.x',
      'case': 'atss_r50_fpn_1x_coco',
      'config': 'configs/atss/atss_r50_fpn_1x_coco.py',
      'test_version': 'benchmark_20230209',
      'test_started_time': 1675924114,
      'success': true,
      'results': {
        'dataset': 'coco',
        'eval': [
          'bbox'
        ],
        'metrics': {
          'coco/bbox_mAP': '0.3950'
        }
      }
    },
    {
      '_id': '63e49e0786699336f1ec1d43',
      'repo': 'mmdetection',
      'branch': 'dev-3.x',
      'case': 'atss_r50_fpn_1x_coco',
      'config': 'configs/atss/atss_r50_fpn_1x_coco.py',
      'test_version': 'benchmark_20230209_2',
      'test_started_time': 1675927047,
      'success': false,
      'results': {
        'dataset': 'coco',
        'eval': [
          'bbox'
        ],
        'metrics': {
          'coco/bbox_mAP': '0.3790'
        },
        'baseline': {
          'bbox_mAP': 39.4
        }
      }
    },
    {
      '_id': '63e663e8609a9f867339174e',
      'repo': 'mmdetection',
      'branch': 'dev-3.x',
      'case': 'atss_r50_fpn_1x_coco',
      'config': 'configs/atss/atss_r50_fpn_1x_coco.py',
      'test_version': 'benchmark_test_20230210',
      'test_started_time': 1676043240,
      'success': true,
      'results': {
        'dataset': 'coco',
        'eval': [
          'bbox'
        ],
        'metrics': {
          'coco/bbox_mAP': '0.3950'
        },
        'baseline': {
          'bbox_mAP': 39.4
        }
      }
    },
    {
      '_id': '63e9ab106e837956897e2adc',
      'repo': 'mmdetection',
      'branch': 'dev-3.x',
      'case': 'atss_r50_fpn_1x_coco',
      'config': 'configs/atss/atss_r50_fpn_1x_coco.py',
      'test_version': 'benchmark_20230213',
      'test_started_time': 1676258064,
      'success': true,
      'results': {
        'dataset': 'coco',
        'eval': [
          'bbox'
        ],
        'metrics': {
          'coco/bbox_mAP': '0.3950'
        },
        'baseline': {
          'bbox_mAP': 39.4
        }
      }
    }
  ]
}

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
      let head = ''
      // eslint-disable-next-line
      let title = []
      // eslint-disable-next-line
      let metrics = []
      const d = resData.data
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
