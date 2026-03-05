import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, Checkbox, Tag, message } from "antd";
import axiosInstance from "../api/axiosInstance";

const ExperienceModal = ({ isOpen, onClose, onSave }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");

    const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleAddSkill = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            const trimmed = skillInput.trim();

            if (skills.length >= 5) {
                return message.warning("Max 5 skills per role");
            }
            if (skills.includes(trimmed)) {
                return message.warning("Skill already added");
            }
            if (trimmed.length > 35) {
                return message.warning("Skill name too long");
            }

            setSkills([...skills, trimmed]);
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (indexToRemove, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setSkills((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleFinish = async (values) => {
        setLoading(true);
        try {
            const payload = { ...values, skills, currentRole: isCurrent };
            await axiosInstance.post("/users/me/experience", payload);
            message.success("Experience added");
            setIsCurrent(false)
            setSkills([])
            form.resetFields();
            setSkills([]);
            onSave();
            onClose();
        } catch (err) {
            message.error("Failed to add experience");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setIsCurrent(false);
            setSkills([]);
            setSkillInput("");
            form.resetFields();
        }
    }, [isOpen, form]);

    return (
        <Modal
            title="Add experience"
            open={isOpen}
            onCancel={onClose}
            confirmLoading={loading}
            onOk={() => form.submit()}
            width={700}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                    <Input placeholder="Ex: Retail Sales Manager" />
                </Form.Item>
                <Form.Item label="Company" name="company" rules={[{ required: true }]}>
                    <Input placeholder="Ex: Microsoft" />
                </Form.Item>

                <Form.Item name="currentRole" valuePropName="checked">
                    <Checkbox onChange={(e) => setIsCurrent(e.target.checked)}>
                        I am currently working in this role
                    </Checkbox>
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Start Month" name="startMonth" rules={[{ required: true }]}>
                        <Select options={months.map(m => ({ label: m, value: m }))} />
                    </Form.Item>
                    <Form.Item label="Start Year" name="startYear" rules={[{ required: true }]}>
                        <Select options={years.map(y => ({ label: y, value: y }))} />
                    </Form.Item>
                </div>

                {!isCurrent && (
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="End Month" name="endMonth" rules={[{ required: true }]}>
                            <Select options={months.map(m => ({ label: m, value: m }))} />
                        </Form.Item>
                        <Form.Item label="End Year" name="endYear"
                            rules={[
                                { required: !isCurrent, message: 'Required' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const sYear = getFieldValue('startYear');
                                        const sMonth = getFieldValue('startMonth');
                                        const eMonth = getFieldValue('endMonth');

                                        if (!value || !sYear) return Promise.resolve();

                                        if (value < sYear) {
                                            return Promise.reject(new Error('End year cannot be before start year'));
                                        }

                                        if (value === sYear && sMonth && eMonth) {
                                            if (months.indexOf(eMonth) < months.indexOf(sMonth)) {
                                                return Promise.reject(new Error('End month must be after start month'));
                                            }
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Select options={years.map(y => ({ label: y, value: y }))} />
                        </Form.Item>
                    </div>
                )}

                <Form.Item label={`Skills (${skills.length}/5)`}>
                    <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleAddSkill}
                        placeholder="Add skill and press Enter"
                        disabled={skills.length >= 5}
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                        {skills.map((s, i) => (
                            <Tag
                                key={`${s}-${i}`}
                                closable
                                onClose={(e) => handleRemoveSkill(i, e)}
                                color="blue"
                                className="px-3 py-1 rounded-full"
                            >
                                {s}
                            </Tag>
                        ))}
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ExperienceModal;