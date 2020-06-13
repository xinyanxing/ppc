import React from 'react';
import './List.less';
import fetch from "./fetch";
import { formatDate } from './utils'
import { Tabs, Card, WingBlank, WhiteSpace, PullToRefresh, ListView, Button, Modal, Toast } from 'antd-mobile';

class List extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      type: '1',
      pageNum: 1,
      pageSize: 10,
      dataSource,
      refreshing: false,
      height: document.documentElement.clientHeight,
      list: [],
      total: 0,
      isLoading: false
    }
    document.title = '报告列表'
  }
  componentDidMount() {
    this.load()
  }
 
  load = async () => {
    const { pageNum, pageSize, type, list } = this.state
    const rev = await fetch.get(`xlt/getXltReportForApp`, {
      params: {
        pageNum,
        pageSize,
        status: type
      }
    })
    if (rev.success && rev.data) {
      const _list = rev.data.list || []

      this.setState({
        list: list.concat(_list),
        total: rev.data.total,
        refreshing: false,
        loading:false
      })
    }

  }
  handleTabChange = (tab) => {
    this.setState({
      type: tab.key,
      list: [],
      pageNum: 1
    }, this.load)
  }
  onRefresh = () => {
    this.setState({
      refreshing: true,
      list: [],
      pageNum: 1
    }, this.load)
  }
  onEndReached = () => {
    
    let { total, list, pageNum,loading } = this.state
    if (total === list.length||loading) return false;
    this.setState({loading:true})
    this.setState({
      pageNum: ++pageNum
    }, this.load)

  }
  export = async (rowData) => {
    const res = await fetch.get(`xlt/exportXltFeedBackData/${rowData.id}`)
    if (res.success && res.data) {
      if (window.JSBridge) {
        window.JSBridge.callNativeMethod('downloadWithBrowser', { url: res.data.fileUrl }, {
          success: function (res) {

          },
          fail: function (error) {
            Toast.info('下载失败');
          }
        })
      } else {
        window.location.href = res.data.fileUrl
      }
    }


  }
  deleteReport = (rowData) => {
    Modal.alert('', '确定删除?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          fetch.delete(`xlt/deleteXltReprt/${rowData.id}`)
            .then(res => {
              if (res.success) {
                Toast.info('删除成功', 1);
                this.setState({
                  list: [],
                  pageNum: 1
                }, this.load)
              }
            })
        }
      },
    ])
  }
  editReport = (rowData) => {
    this.props.history.push(`/detail/${rowData.id}`)
  }
  renderRow = (rowData, sectionID, rowID) => {
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <Card>
          <Card.Body>
            <div className='xltReportNum'>
              编号:{rowData.xltReportNum}
            </div>
            <div className='dateName'>
              <span>收到报告日期：{formatDate(rowData.receiveReportDate)}</span>
              <span className='line'>|</span>
              <span className='patientName'>患者姓名：{rowData.patientName}</span>
            </div>

            <div className='list-btns'>
              {
                rowData.status === 1 && <React.Fragment>
                  <Button size='small' onClick={() => this.deleteReport(rowData)}>删除</Button>
                  <Button size='small' onClick={() => this.editReport(rowData)}>编辑报告</Button>
                </React.Fragment>
              }
              {
                rowData.status === 3 &&
                <React.Fragment>
                  <Button size='small' onClick={() => this.export(rowData)}>查看反馈</Button>
                </React.Fragment>
              }
              {
                (rowData.status === 2 || rowData.status === 3) && <Button size='small' onClick={() => this.editReport(rowData)}>查看报告</Button>
              }

            </div>
          </Card.Body>
        </Card>
        <WhiteSpace size="lg" />
      </WingBlank>
    )
  }
  render() {
    const { dataSource, list, refreshing,  type,loading } = this.state
    const tabs = [
      { title: '未发送', key: '1' },
      { title: '已发送', key: '2' },
      { title: '已回复', key: '3' }
    ]


    
    const ListViewProps = {
      dataSource: dataSource.cloneWithRows(list),
      renderFooter: () => (<div style={{ padding: 30, textAlign: 'center' }}>
        {loading ? '正在加载...' : ''}
      </div>),
      renderRow: (rowData, id1, i) => this.renderRow(rowData, i),
      pageSize: 10,
      useBodyScroll: true,
      style: {
        // height: this.state.height,
        overflow: 'auto',
        marginTop:'45px'
        
      },
      pullToRefresh: <PullToRefresh
        refreshing={refreshing}
        onRefresh={this.onRefresh}
      />,
      scrollRenderAheadDistance: 500,
      onEndReached: this.onEndReached,
      onEndReachedThreshold: 10
    }
    const NoData = <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <Card style={{marginTop:'45px'}}>
        <Card.Body>
          <div style={{ textAlign: 'center' }}>暂无数据</div>
        </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
    </WingBlank>
    return (
      <div className="report-list">
        <div className='addReport' onClick={() => this.props.history.push('/detail')}>+</div>
        <Tabs tabs={tabs}
          swipeable={false}
          initialPage="1"
          onChange={this.handleTabChange}
        >
          <div style={{minHeight:'100vh'}} key='1'>
            {
              list && list.length > 0 ?
                <ListView
                  className={`ListView1`}
                  key={type}
                  ref={el => this[`lv1`] = el}
                  {...ListViewProps}
                /> :
                NoData
            }
          </div>
          <div style={{minHeight:'100vh'}} key='2'>
            {
              list && list.length > 0 ?
                <ListView
                  className={`ListView2`}
                  key={type}
                  ref={el => this[`lv2`] = el}
                  {...ListViewProps}
                /> :
                NoData
            }
          </div>
          <div  style={{minHeight:'100vh'}} key='3'>
            {
              list && list.length > 0 ?
                <ListView
                  className={`ListView3`}
                  key={type}
                  ref={el => this[`lv3`] = el}
                  {...ListViewProps}
                /> :
                NoData
            }
          </div>
        </Tabs>

      </div>
    );
  }
}
export default List;
