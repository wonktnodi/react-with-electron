import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import { getListBasics } from '../../actions';
import * as types from '../../actions/types';
import styles from './BasicList.module.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(
  ({ loading }) => ({ loading: loading.effects[types.LIST_DATA_BASICS] }),
  dispatch => bindActionCreators({ getListBasics }, dispatch)
)
export default class BasicList extends PureComponent {
  state = {
    list: [],
  };

  componentDidMount() {
    this.fetchData();
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'list/fetch',
    //   payload: {
    //     count: 5,
    //   },
    // });
  }

  fetchData = () => {
    const { getListBasics: apiFunc } = this.props;

    apiFunc({}, this.afterListDataFetched);
  };

  afterListDataFetched = data => {
    console.log(data.data);
    this.setState({ list: data.data.list });
  };

  render() {
    const { loading } = this.props;
    const { list } = this.state;
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>开始时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <PageHeaderLayout title="基本列表">
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个任务" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="标准列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item actions={[<a>编辑</a>, <MoreBtn />]}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
