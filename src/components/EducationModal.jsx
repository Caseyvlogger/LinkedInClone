import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import axiosInstance from "../api/axiosInstance";

const EducationModal = ({ isOpen, onClose, onSave }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() + 5 - i);

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
        }
    }, [isOpen, form]);

    const handleFinish = async (values) => {
        setLoading(true);
        try {
            await axiosInstance.post("/users/me/education", values);
            message.success("Education added successfully");
            onSave();
            onClose();
        } catch (err) {
            message.error("Failed to add education");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Add education"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose} disabled={loading}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" loading={loading} onClick={() => form.submit()}>
                    Save
                </Button>
            ]}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item label="School" name="school" rules={[{ required: true, message: 'Please enter your school name' }]}>
                    <Input placeholder="Ex: Boston University" />
                </Form.Item>

                <Form.Item label="Degree" name="degree">
                    <Input placeholder="Ex: Bachelor's" />
                </Form.Item>

                <Form.Item label="Field of study" name="fieldOfStudy">
                    <Input placeholder="Ex: Business" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Start Year"
                        name="startYear"
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Select placeholder="Year" options={years.map(y => ({ label: y, value: y }))} />
                    </Form.Item>

                    <Form.Item
                        label="End Year (or expected)"
                        name="endYear"
                        rules={[
                            { required: true, message: 'Required' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const startYear = getFieldValue('startYear');
                                    if (!value || !startYear || value >= startYear) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('End year cannot be before start year'));
                                },
                            }),
                        ]}
                    >
                        <Select placeholder="Year" options={years.map(y => ({ label: y, value: y }))} />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default EducationModal;