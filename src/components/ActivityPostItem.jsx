import { useState } from "react";
import { Button, Space, Divider, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axiosInstance from "../api/axiosInstance";

const ActivityPostItem = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);

    const handleLoadComments = async () => {
        try {
            setLoadingComments(true);
            const response = await axiosInstance.get(`/posts/${post._id}/comments`);
            setComments(response.data);
        } catch (error) {
            message.error("Failed to load comments.");
        } finally {
            setLoadingComments(false);
        }
    };

    const renderPostImages = (images) => {
        if (!images || images.length === 0) return null;
        return (
            <div className={`grid gap-1 mt-2 mx-4 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {images.map((imgUrl, index) => (
                    <img
                        key={index}
                        src={imgUrl}
                        className={`rounded-lg object-cover ${images.length === 1
                            ? 'max-w-full max-h-[400px] w-auto h-auto mx-auto'
                            : 'w-full h-48'}`}
                        alt="Post content"
                        loading="lazy"
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 pt-3 pb-4 mb-4 shadow-sm">
            {/* Header: Author & Actions */}
            <div className="flex justify-between items-start px-4 mb-2">
                <div className="flex gap-2">
                    <img
                        src={post.author?.profilePicture || "src/assets/avatar-colorful-48.png"}
                        className="w-12 h-12 rounded-full"
                        alt="User"
                    />
                    <div>
                        <p className="font-bold text-sm hover:underline cursor-pointer">
                            {post.author?.name} {post.author?.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <Space>
                    <Button icon={<EditOutlined />} type="text" className="text-blue-600">Edit</Button>
                    <Button icon={<DeleteOutlined />} type="text" danger>Delete</Button>
                </Space>
            </div>

            {/* Post Content */}
            <div className="px-4 text-sm text-gray-800 whitespace-pre-wrap">
                {post.content}
            </div>

            {/* Post Images */}
            {renderPostImages(post.images)}

            <Divider className="my-3" />

            {/* Statistics */}
            <div className="px-4 flex justify-between text-xs text-gray-500 mb-2">
                <span>{post.likes?.length || 0} Likes</span>
                <span>{post.commentCount || 0} Comments</span>
            </div>

            {/* Comments Section */}
            <div className="px-4 border-t border-gray-100 pt-2">
                {comments.length === 0 ? (
                    post.commentCount > 0 && (
                        <Button
                            type="link"
                            onClick={handleLoadComments}
                            loading={loadingComments}
                            className="text-gray-500 text-xs p-0"
                        >
                            Load comments...
                        </Button>
                    )
                ) : (
                    <div className="space-y-3 mt-2">
                        {comments.map((comment) => (
                            <div key={comment._id} className="flex gap-2">
                                <img
                                    src={comment.author?.profilePicture || "src/assets/avatar-colorful-48.png"}
                                    className="w-8 h-8 rounded-full"
                                    alt="user"
                                />
                                <div className="flex-1">
                                    <div className="bg-gray-100 p-2 rounded-lg">
                                        <p className="font-bold text-[12px]">{comment.author?.name} {comment.author?.lastName}</p>
                                        <p className="text-sm text-gray-700">{comment.content}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 ml-2">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <Button
                            type="text"
                            size="small"
                            className="text-[10px] text-gray-400"
                            onClick={() => setComments([])}
                        >
                            Hide comments
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityPostItem;