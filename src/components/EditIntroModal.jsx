import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axiosInstance from "../api/axiosInstance"


const EditIntroModal = ({ isOpen, onClose, user, onSave }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            form.setFieldsValue({
                name: user.name,
                lastName: user.lastName,
                headline: user.headline,
                city: user.city
            });
        }
    }, [isOpen, user, form]);

    const handleFinish = async (values) => {
        setLoading(true);
        try {
            await axiosInstance.patch("/users/me", values);
            message.success("Intro updated successfully");
            onSave();
            onClose();
        } catch (err) {
            message.error("Failed to update intro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Edit intro"
            open={isOpen}
            onCancel={() => !loading && onClose()}
            footer={[
                <Button key="cancel" onClick={onClose} disabled={loading}>Cancel</Button>,
                <Button key="save" type="primary" loading={loading} onClick={() => form.submit()}>Save</Button>
            ]}
            width={700}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="First name" name="name" rules={[{ required: true, message: 'Please enter your first name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
                        <Input />
                    </Form.Item>
                </div>
                <Form.Item label="Headline" name="headline">
                    <Input placeholder="Ex: Software Engineer Intern at Shifa" />
                </Form.Item>
                <Form.Item label="Location (City)" name="city">
                    <Input placeholder="Ex: Islamabad, Pakistan" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditIntroModal;