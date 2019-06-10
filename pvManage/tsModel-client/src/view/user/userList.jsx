import React from 'react';
import { Table , Button } from 'antd';
import { connect } from 'model';
import styled from 'styled-components';

export const genderList = [ '男' , '女' ];

export const ColumnActionWrapper = styled.div`
    a + a {
        margin-left: 10px;
    }
`;


function OriginUserList({user , history , match}) {

    function jumpToEdit(e) {
        const {id} = e.target.dataset;
        history.push(`${match.path}/edit/${id}`);
    }

    function jumpToNew() {
        history.push(`${match.path}/new`);
    }

    const columns = [
        {
            title: '用户id' ,
            dataIndex: 'id'
        } ,
        {
            title: '用户姓名' ,
            dataIndex: 'name'
        } ,
        {
            title: '用户性别' ,
            dataIndex: 'gender' ,
            render(value = 0) {
                return genderList[ value ];
            }
        } ,
        {
            title: '用户手机' ,
            dataIndex: 'mobile'
        } ,
        {
            title: '操作' ,
            key: 'action' ,
            render(_ , record) {
                return (
                    <ColumnActionWrapper>
                        <a
                            href="javascript:void(0)"
                            data-id={record.id}
                            onClick={jumpToEdit}
                        >
                            编辑
                        </a>
                        <a href="javascript:void(0)">删除</a>
                    </ColumnActionWrapper>
                );
            }
        }
    ];

    return (
        <section>

            <Button type="primary" onClick={jumpToNew}>
                新建
            </Button>
            <Table
                columns={columns || []}
                dataSource={user.users || []}
                rowKey="id"
            />
        </section>
    );
}

export const UserList = connect(({user}) => ({user}))(OriginUserList);
