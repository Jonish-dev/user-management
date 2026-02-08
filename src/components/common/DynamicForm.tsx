import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, Space, Row, Col, Divider, Typography } from "antd";
import { Save, X } from "lucide-react";
import type { User, UserSchema, UserFormData, FormFieldConfig } from "@/types/user";

const { Text } = Typography;

interface DynamicFormProps {
    schema: UserSchema;
    initialValues?: User | null;
    onFinish: (values: UserFormData) => void;
    onCancel: () => void;
    loading?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
    schema,
    initialValues,
    onFinish,
    onCancel,
    loading,
}) => {
    const [form] = Form.useForm<UserFormData>();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const renderField = (field: FormFieldConfig) => {
        const commonProps = {
            placeholder: field.placeholder,
            size: "large" as const,
            style: { borderRadius: 8 }
        };

        switch (field.type) {
            case "number":
                return <InputNumber {...commonProps} style={{ ...commonProps.style, width: "100%" }} />;
            case "textarea":
                return <Input.TextArea {...commonProps} rows={4} />;
            case "email":
                return <Input type="email" {...commonProps} />;
            default:
                return <Input {...commonProps} />;
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            scrollToFirstError
        >
            <Row gutter={[24, 0]}>
                {schema.fields.map((field) => (
                    <Col
                        key={field.name}
                        xs={24}
                        md={field.type === "textarea" ? 24 : 12}
                    >
                        <Form.Item
                            name={field.name}
                            label={
                                <Text strong style={{ fontSize: 13, color: '#595959' }}>
                                    {field.label}
                                </Text>
                            }
                            rules={field.rules}
                        >
                            {renderField(field)}
                        </Form.Item>
                    </Col>
                ))}
            </Row>

            <Divider style={{ margin: '8px 0 24px' }} />

            <Form.Item style={{ marginBottom: 0 }}>
                <Space style={{ width: "100%", justifyContent: "flex-end" }} size="middle">
                    <Button
                        onClick={onCancel}
                        disabled={loading}
                        size="large"
                        icon={<X size={16} />}
                        className="flex items-center"
                        style={{ borderRadius: 8 }}
                    >
                        Discard
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        size="large"
                        icon={<Save size={16} />}
                        className="flex items-center"
                        style={{ borderRadius: 8, padding: '0 32px', fontWeight: 600 }}
                    >
                        {initialValues ? "Apply Changes" : "Save Account"}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default DynamicForm;
