import React from 'react';
import { Form, message, Input, DatePicker, Button } from 'antd';
import { connect } from 'model';
import { findOneById } from '../../model/user/helper';
import moment from 'moment';
import { getRequiredRule } from '../../utils/getRequiredRule';
import { fieldHasError } from '../../utils/fieldHasError';
import { LoadingHoc } from '../../component/LoadingHoc';


@LoadingHoc
@connect(({ product }) => ({ products: product }))
@Form.create()
class ProductForm extends React.Component {
    initialValues = null;

    componentDidMount() {
        this.props.form.validateFieldsAndScroll();
        this.initFormValues();
    }

    get isEdit() {
        return this.props.action === 'edit';
    }

    get productId() {
        const { match: { params = {} } = {} } = this.props;
        return params.id;
    }

    get currentProduct() {
        const { products } = this.props;
        return findOneById(products, this.productId);
    }

    get productEffects() {
        return this.props.effects.product;
    }

    initFormValues() {
        const { products, history } = this.props;

        if (this.isEdit && this.userId) {
            const editProduct = findOneById(
                products,
                parseInt(this.productId, 10)
            );
            if (!editProduct) {
                message.error('没有该产品');
                setTimeout(() => {
                    history.goBack();
                }, 800);
                return;
            }
            this.initialValues = editProduct;
        }
    }

    componentWillMount() {
        this.props.form.resetFields();
    }

    handleSubmit = e => {
        e.preventDefault();

        const { form, action, history } = this.props;

        form.validateFields(async error => {
            if (error) {
                return;
            }
            const dto = form.getFieldsValue();
            const { createTime } = dto;

            if (moment.isMoment(createTime)) {
                dto.createTime = createTime.valueOf();
            }
            this.props.toggleLoading();
            if (action === 'new') {
                await this.productEffects.add(dto);
                message.success('添加产品成功');
            } else if (this.isEdit && this.productId) {
                await this.productEffects.update(this.productId, dto);
                message.success('修改产品成功');
            } else {
                message.error('出错了');
            }
            this.props.toggleLoading();

            history.goBack();
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;
        let initialValues = {};
        if (this.isEdit && this.productId && this.currentProduct) {
            initialValues = this.currentProduct;
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label="产品名称">
                    {getFieldDecorator('name', {
                        initialValue: initialValues.name,
                        rules: [getRequiredRule('产品名称')]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="产品描述">
                    {getFieldDecorator('description', {
                        initialValue: initialValues.description,
                        rules: [getRequiredRule('产品描述')]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="创建日期">
                    {getFieldDecorator('createTime', {
                        initialValue: initialValues.createTime
                            ? moment(parseInt(initialValues.createTime, 10))
                            : undefined
                    })(<DatePicker />)}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={fieldHasError(getFieldsError())}
                    >
                        保存
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export { ProductForm };
