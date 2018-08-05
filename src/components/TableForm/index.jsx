import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import styles from './tableForm.module.less';

export default class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      editing: false,
      columns: [],
    };
  }

  componentDidMount() {
    const { columns: testCols } = this.props;
    console.log(testCols);

    const columns = testCols.map((element, idx) => {
      const newItem = {
        dataIndex: element.dataIndex,
        title: element.title,
        key: element.key,
        width: element.width,
      };

      newItem.render = (text, record) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus={idx === 0}
              onChange={e => this.handleFieldChange(e, element.dataIndex, record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder={element.placeholder}
            />
          );
        }
        return text;
      };
      return newItem;
    });

    columns.push({
      title: '操作',
      key: 'action',
      render: (text, record) => {
        const { loading } = this.state;
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要取消添加？" onConfirm={() => this.remove(record.key)}>
                  <a>取消</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.saveRow(e, record.key)}>保存</a>
              <Divider type="vertical" />
              <a onClick={e => this.cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    });

    this.setState({ columns });
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    let editingKey = null;
    newData.forEach(element => {
      if (element.editable === true) editingKey = element.key;
    });

    if (editingKey && editingKey !== key) {
      message.warn('请确认正在编辑的内容');
      return;
    }

    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData, editing: target.editable });
    }
  };

  newMember = () => {
    const { data } = this.state;
    const { initailValue } = this.props;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      editable: true,
      isNew: true,
      ...initailValue,
    });
    this.index += 1;
    this.setState({ data: newData, editing: true });
  };

  finishSaveData = (e, target) => {
    const { onChange } = this.props;
    delete target.isNew;
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.forEach(element => {
      if (element.key === target.key) element.editable = false;
    });

    onChange(newData);
    this.setState({
      loading: false,
      editing: false,
    });
  };

  saveRow = (e, key) => {
    e.persist();
    this.setState({
      loading: true,
    });
    const { onDataSave, dataValidator, validateMsg } = this.props;
    const target = this.getRowByKey(key) || {};

    if (dataValidator(target) !== true) {
      message.error(validateMsg);
      e.target.focus();
      this.setState({
        loading: false,
      });
      return;
    }

    // saving operatoin
    onDataSave(e, target, this.finishSaveData);
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData, editing: false });
    onChange(newData);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData, editing: false });
    this.clickedCancel = false;
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }

  render() {
    const { columns, loading, data, editing } = this.state;
    const { addBtnTxt } = this.props;
    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
          disabled={editing}
        >
          {addBtnTxt || '增加'}
        </Button>
      </Fragment>
    );
  }
}
