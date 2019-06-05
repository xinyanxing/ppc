import React from 'react';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import { connect } from 'model';
import { fieldHasError } from 'utils/fieldHasError';
import { getRequiredRule } from 'utils/getRequiredRule';
import { findOneById } from '../../model/user/helper';
import moment from 'moment';

@connect()
@Form.create()
class UserForm extends React.Component {
    componentDidMount() {
        this.props.form.validateFieldsAndScroll();
        this.initFormValues();
    }

    get isEdit() {
        return this.props.action === 'edit';
    }

    get userId() {
        const { match: { params = {} } = {} } = this.props;
        return params.id;
    }

    get currentUser() {
        const {
            state: { user }
        } = this.props;
        return findOneById(user.users, parseInt(this.userId, 10));
    }

    initialValues = null;

    initFormValues() {
        const {
            state: {
                user: { users }
            },
            history
        } = this.props;

        if (this.isEdit && this.userId) {
            const editUser = findOneById(users, parseInt(this.userId, 10));
            if (!editUser) {
                message.error('没有该用户');
                setTimeout(() => {
                    history.goBack();
                }, 800);
                return;
            }
            this.initialValues = editUser;
        }
    }

    componentWillMount() {
        this.props.form.resetFields();
    }

    get userActions() {
        return this.props.actions.user;
    }

    handleSubmit = e => {
        e.preventDefault();

        const { form, action, history } = this.props;

        form.validateFields(error => {
            if (error) {
                return;
            }
            const userDto = form.getFieldsValue();
            const { birthday } = userDto;

            if (moment.isMoment(birthday)) {
                userDto.birthday = birthday.valueOf();
            }

            if (action === 'new') {
                this.userActions.add(userDto);
                message.success('添加用户成功');
            } else if (this.isEdit && this.userId) {
                this.userActions.update({
                    id: parseInt(this.userId, 10),
                    userDto
                });
                message.success('修改用户成功');
            } else {
                message.error('出错了');
            }

            history.goBack();
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;
        let initialValues = {};
        if (this.isEdit && this.userId && this.currentUser) {
            initialValues = this.currentUser;
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label="用户姓名">
                    {getFieldDecorator('name', {
                        rules: [getRequiredRule('姓名')],
                        initialValue: initialValues.name
                    })(<Input placeholder="请输入姓名" />)}
                </Form.Item>

                <Form.Item label="用户性别">
                    {getFieldDecorator('gender', {
                        rules: [getRequiredRule('性别')],
                        initialValue: initialValues.gender
                    })(
                        <Select placeholder="请选择性别">
                            <Select.Option key="0">男</Select.Option>
                            <Select.Option key="1">女</Select.Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item label="用户手机">
                    {getFieldDecorator('mobile', {
                        rules: [
                            getRequiredRule('手机号'),
                            {
                                pattern: /^\d{11}$/,
                                message: '请输入正常手机号码'
                            }
                        ],
                        initialValue: initialValues.mobile
                    })(<Input placeholder="请输入11位手机号码" />)}
                </Form.Item>

                <Form.Item label="用户生日">
                    {getFieldDecorator('birthday', {
                        initialValue: initialValues.birthday
                            ? moment(parseInt(initialValues.birthday, 10))
                            : undefined
                    })(<DatePicker placeholder="请选择生日" />)}
                </Form.Item>

                <Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        disabled={fieldHasError(getFieldsError())}
                    >
                        保存
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export { UserForm };
