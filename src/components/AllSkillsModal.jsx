import { useState, useEffect } from "react";
import { Modal, Input, Button, Divider, message, Tag } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axiosInstance from "../api/axiosInstance";

const AllSkillsModal = ({ isOpen, onClose, skills, onSave }) => {
    const [localSkills, setLocalSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [loading, setLoading] = useState(false);

    const MAX_SKILLS = 20;

    useEffect(() => {
        if (isOpen) {
            setLocalSkills(skills || []);
            setNewSkill("");
        }
    }, [isOpen, skills]);

    const handleAddSkill = () => {
        const trimmed = newSkill.trim();

        if (!trimmed) return;

        if (localSkills.length >= MAX_SKILLS) {
            return message.error(`You can only add up to ${MAX_SKILLS} skills.`);
        }

        if (localSkills.includes(trimmed)) {
            return message.warning("This skill is already in your list.");
        }

        if (trimmed.length > 15) {
            return message.warning("Skill name is too long (max 15 chars).");
        }

        setLocalSkills([...localSkills, trimmed]);
        setNewSkill("");
    };

    const handleRemoveLocalSkill = (indexToRemove, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setLocalSkills((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSaveToDb = async () => {
        setLoading(true);
        try {
            await axiosInstance.patch("/users/me", { skills: localSkills });
            message.success("Skills saved successfully");
            onSave();
            onClose();
        } catch (err) {
            message.error("Failed to save skills");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={`Skills (${localSkills.length}/${MAX_SKILLS})`}
            open={isOpen}
            onCancel={onClose}
            confirmLoading={loading}
            footer={[
                <Button key="cancel" onClick={onClose} disabled={loading}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSaveToDb} loading={loading}>
                    Done
                </Button>
            ]}
        >
            <div className="mb-6">
                <p className="font-semibold mb-2 text-gray-600">Add skill</p>
                <div className="flex gap-2">
                    <Input
                        placeholder="Ex: React.js"
                        value={newSkill}
                        maxLength={15}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onPressEnter={(e) => {
                            e.preventDefault();
                            handleAddSkill();
                        }}
                        disabled={localSkills.length >= MAX_SKILLS}
                    />
                    <Button
                        icon={<PlusOutlined />}
                        onClick={handleAddSkill}
                        disabled={localSkills.length >= MAX_SKILLS}
                    >
                        Add
                    </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    {localSkills.length >= MAX_SKILLS
                        ? "Maximum limit reached"
                        : `You can add ${MAX_SKILLS - localSkills.length} more skills.`}
                </p>
            </div>

            <Divider />

            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto p-1">
                {localSkills.map((skill, index) => (
                    <Tag
                        key={`${skill}-${index}`}
                        closable
                        onClose={(e) => handleRemoveLocalSkill(index, e)}
                        className="px-3 py-1 text-sm flex items-center gap-1 border-blue-200 bg-blue-50"
                        closeIcon={<DeleteOutlined className="text-red-500" />}
                    >
                        {skill}
                    </Tag>
                ))}
                {localSkills.length === 0 && (
                    <p className="text-gray-400 italic">No skills added yet.</p>
                )}
            </div>
        </Modal>
    );
};

export default AllSkillsModal;