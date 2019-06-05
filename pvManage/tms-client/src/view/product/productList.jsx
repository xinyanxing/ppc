import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'model';
import { ColumnActionWrapper } from '../user/userList';
import { LoadingHoc } from '../../component/LoadingHoc';

@LoadingHoc
@connect(state => ({ products: state.product }))
class ProductList extends React.Component {
    columns = [
        {
            title: '产品序号',
            dataIndex: 'id'
        },
        {
            title: '产品名称',
            dataIndex: 'name'
        },
        {
            title: '产品描述',
            dataIndex: 'description'
        },
        {
            title: '创建日期',
            dataIndex: 'createTime'
        },
        {
            actions: '操作',
            key: 'action',
            render: record => {
                return (
                    <ColumnActionWrapper>
                        <a
                            data-id={record.id}
                            href="javascript:void(0)"
                            onClick={this.jumpToEdit}
                        >
                            编辑
                        </a>
                        <a
                            data-id={record.id}
                            href="javascript:void(0)"
                            onClick={this.deleteProduct}
                        >
                            删除
                        </a>
                    </ColumnActionWrapper>
                );
            }
        }
    ];

    get productEffects() {
        return this.props.effects.product;
    }

    /**
     * @return {void}
     */
    async componentDidMount() {
        this.props.toggleLoading();
        await this.productEffects.fetch();
        this.props.toggleLoading();
    }

    jumpToNew = () => {
        const { match, history } = this.props;
        history.push(match.path + '/new');
    };

    jumpToEdit = e => {
        const { id } = e.target.dataset;
        const { match, history } = this.props;
        history.push(match.path + '/edit/' + id);
    };

    deleteProduct = async e => {
        const { id } = e.target.dataset;
        this.props.toggleLoading();
        await this.productEffects.delete(id);
        this.props.toggleLoading();
    };

    render() {
        const { products } = this.props;
        return (
            <section>
                <Button onClick={this.jumpToNew} type="primary">
                    新建
                </Button>
                <Table
                    pagination={false}
                    dataSource={products || []}
                    columns={this.columns}
                    rowKey="id"
                />
            </section>
        );
    }
}

export { ProductList };
