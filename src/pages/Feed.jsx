import { Input, Button, Dropdown, message, Modal } from "antd";
import Navbar from "../components/NavBar";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";

function Feed() {
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postContent, setPostContent] = useState("");

    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 5MB limit
        if (file.size > 5242880) {
            message.error("File is too large! Please select an image under 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        setPostContent("");
        setSelectedImage(null);
    };

    const handlePost = async () => {
        const hideLoading = message.loading('Creating post...', 0);

        try {
            const postData = {
                content: postContent,
                image: selectedImage,
            };

            const response = await axiosInstance.post('/posts', postData);

            if (response.status === 201) {
                hideLoading();
                message.success("Post created successfully!");
                setIsModalOpen(false);
                setPostContent("");
                setSelectedImage(null);
            }
        } catch (error) {
            hideLoading();
            console.error("Post creation error:", error);
            const errorMsg = error.response?.data?.message || "Failed to create post.";
            message.error(errorMsg);
        }
    };

    const items = [
        { label: 'Most relevant', key: '1' },
        { label: 'Most recent', key: '2' },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/me');
                setUser(response.data);
            } catch (error) {
                message.error("Failed to load user profile");
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="bg-[#f4f2ee] min-h-screen">
            <Navbar />

            <div className="flex flex-col md:flex-row justify-center gap-6 px-4 mt-6 max-w-6xl mx-auto">

                {/* Profile Sidebar */}
                <div className="w-full md:w-[225px] flex-shrink-0 bg-white h-fit rounded-lg overflow-hidden border border-gray-200">
                    <div className="w-full h-[58px] bg-gray-300"></div>
                    <div className="relative flex justify-center -mt-8">
                        <div className="relative">
                            <img src="src/assets/avatar-colorful-80.png" alt="Avatar" className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
                            <div className="flex bg-[#0a66c2] h-5 w-5 rounded-full items-center justify-center absolute bottom-0 right-0 border border-white">
                                <span className="text-white text-xs font-bold">+</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-center px-3 pb-4">
                        <p className="font-semibold text-lg hover:underline cursor-pointer">
                            {user ? `${user.name} ${user.lastName}` : "Loading..."}
                        </p>
                        <p className="text-gray-500 text-xs">Software Engineer</p>
                    </div>
                    <div className="border-t border-gray-200 p-3">
                        <Button type="dashed" className="!bg-[#f4f2ee] w-full">Experience</Button>
                    </div>
                </div>

                {/* Main Feed Content */}
                <div className="flex flex-col lg:flex-row gap-6 flex-grow">

                    {/* Feed Posts */}
                    <div className="w-full max-w-[555px] flex flex-col gap-4">

                        {/* Start a post box */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex gap-2">
                                <img src="src/assets/avatar-colorful-48.png" className="w-12 h-12 rounded-full" alt="Avatar" />
                                <Button
                                    onClick={showModal}
                                    className="flex-grow rounded-full text-left px-5 h-12 text-gray-500 font-semibold hover:bg-gray-100"
                                >
                                    Start a post
                                </Button>
                            </div>
                            <div className="flex justify-between mt-3 px-2">
                                <Button type="text" className="font-semibold text-gray-500">Video</Button>
                                <Button type="text" className="font-semibold text-gray-500">Photo</Button>
                                <Button type="text" className="font-semibold text-gray-500">Write article</Button>
                            </div>
                        </div>

                        {/* Example Post */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="flex p-4 gap-2">
                                <img src="src/assets/avatar-colorful-48.png" className="w-12 h-12 rounded-full" alt="Profile" />
                                <div>
                                    <p className="font-semibold text-sm">Eric Hu</p>
                                    <p className="text-xs text-gray-500">Software Developer | Technical Writer</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <span>1w • </span>
                                        <img src="src/assets/earth-black-24.png" className="w-3 h-3" alt="Public" />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 pb-2 text-sm">
                                <p>Recruiters spend 7 seconds reading your resume. Here are 7 steps to guarantee you grab their attention...</p>
                            </div>
                            <img src="src/assets/post-image.jpg" className="w-full" alt="Post" />

                            <div className="flex justify-around border-t border-gray-100 py-1 mt-2">
                                <Button type="text" className="font-semibold text-gray-500">Like</Button>
                                <Button type="text" className="font-semibold text-gray-500">Comment</Button>
                                <Button type="text" className="font-semibold text-gray-500">Repost</Button>
                                <Button type="text" className="font-semibold text-gray-500">Send</Button>
                            </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-1">
                            <hr className="flex-grow border-gray-300" />
                            <Dropdown trigger={['click']} menu={{ items }}>
                                <Button type="text" className="text-xs text-gray-500">
                                    Sort by: <span className="font-semibold text-black">Most Relevant</span>
                                </Button>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Right Suggestions Sidebar */}
                    <div className="w-full lg:w-[300px] bg-white rounded-lg border border-gray-200 p-4 h-fit">
                        <p className="font-semibold mb-4">Add to your Feed</p>

                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex gap-3 mb-4">
                                <img src="src/assets/avatar-colorful-48.png" className="w-12 h-12 rounded-full" alt="Avatar" />
                                <div>
                                    <p className="font-semibold text-sm">Name</p>
                                    <p className="text-xs text-gray-500 mb-2">Designation</p>
                                    <Button size="small" className="rounded-full border-gray-600 font-semibold px-4">
                                        + Follow
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <Button type="text" className="text-gray-500 font-semibold w-full text-left">
                            View all recommendations →
                        </Button>
                    </div>
                </div>
            </div>

            {/* Post Modal */}
            <Modal
                title="Create a post"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="image" type="text" className="float-left" onClick={handleImageClick}>
                        📷
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        disabled={!postContent.trim()}
                        onClick={handlePost}
                        className="rounded-full font-semibold"
                    >
                        Post
                    </Button>
                ]}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <div className="flex items-center gap-2 mb-4">
                    <img src="src/assets/avatar-colorful-48.png" className="w-10 h-10 rounded-full" alt="User" />
                    <p className="font-semibold">{user?.name} {user?.lastName}</p>
                </div>
                <Input.TextArea
                    placeholder="What do you want to talk about?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={4}
                    variant="borderless"
                />
                {selectedImage && (
                    <div className="relative mt-4">
                        <img src={selectedImage} alt="Preview" className="w-full max-h-[300px] object-contain rounded-lg" />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            size="small"
                            className="absolute top-2 right-2"
                            onClick={() => setSelectedImage(null)}
                        >
                            X
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Feed;