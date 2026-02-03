import { Input, Button, Dropdown, message, Modal } from "antd";
import Navbar from "../components/NavBar";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";

function Feed() {
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postContent, setPostContent] = useState("");

    const fileInputRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Supervisor's requirement: 5MB limit (5 * 1024 * 1024 bytes)
        if (file.size > 5242880) {
            message.error("File is too large! Please select an image under 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result); // This is your Base64 string
        };
        reader.readAsDataURL(file);
    };

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        setPostContent(""); // Clear text on close
    };

    const handlePost = async () => {
        // Show a loading state to the user
        const hideLoading = message.loading('Creating post...', 0);

        try {
            const postData = {
                content: postContent,
                image: selectedImage, // The Base64 string you got from FileReader
            };

            // Your auth.route.cjs should have: router.post('/posts', auth, postController.createPost)
            const response = await axiosInstance.post('/posts', postData);

            if (response.status === 201) {
                hideLoading();
                message.success("Post created successfully!");

                // Reset the Modal and State
                setIsModalOpen(false);
                setPostContent("");
                setSelectedImage(null);

                // Optional: Refresh feed logic can go here
            }
        } catch (error) {
            hideLoading();
            console.error("Post creation error:", error);

            const errorMsg = error.response?.data?.message || "Failed to create post. Check image size.";
            message.error(errorMsg);
        }
    };

    const items = [
        {
            label: 'Most relevant',
            key: '1',
        },
        {
            label: 'Most recent',
            key: '2',
        },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // We call the new /me endpoint
                const response = await axiosInstance.get('/me');
                setUser(response.data);
            } catch (error) {
                message.error("Failed to load user profile", error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="bg-[#f4f2ee]">{/* Change bg */}

            <Navbar />
            {/* w-full for small screens */}
            <div className="flex md:flex-row lg:flex-row justify-self-center flex-col border border-red-700 mx-5
             justify-center bg-[#f4f2ee]">
                {/* Profile */}
                <div className="w-full min-[600px]:w-[576px] md:w-[225px] lg:w-[225px] flex-shrink-0 relative bg-white h-fit rounded-[10px]">
                    {/* Gray bg */}
                    <div className="w-full h-[58px] bg-gray-300 border z-0"></div>
                    {/* Absolute avatar */}
                    <div className="border size-fit absolute top-4 z-10">
                        <img src="src\assets\avatar-colorful-80.png" alt="Avatar" />
                        <div className="flex bg-[#0a66c2] h-[20px] w-[20px] rounded-[100%] items-center justify-center absolute bottom-2 right-2">
                            <span className="text-white font-semibold">+</span>
                        </div>
                    </div>
                    {/* Dynamic Name and Details */}
                    <div className="mt-10 ml-3 pb-4">
                        <p className="font-semibold text-lg">
                            {user ? `${user.name} ${user.lastName}` : "Loading..."}
                        </p>
                    </div>
                    {/* Experience button */}
                    <div className="justify-self-center w-[90%] mt-3 mb-3">

                        <Button type="dashed" className="!bg-[#f4f2ee] w-full justify-self-center">Experience</Button>
                    </div>

                </div>
                {/*Feed, Suggestions  className="ml-[5px]"col when tablet*/}
                <div className="flex flex-col md:flex-col lg:flex-row">
                    {/* Feed */}
                    <div className="w-full min-[600px]:w-[576px] min-[768px]:w-[471px] min-[992px]:w-[387px] min-[1200px]:w-[555px] border  flex-shrink-, marginTop:'10px'0">
                        {/* Avatar + Input row */}
                        <div className="flex flex-col justify-between border w-[95%] justify-self-center bg-white">
                            <div className="flex flex-row">
                                <img src="src\assets\avatar-colorful-48.png" alt="Avatar" />
                                <Button
                                    onClick={showModal}
                                    style={{
                                        height: "48px",
                                        width: "467px", //Change this for mobile; Consider width:100% or max-width.
                                        borderRadius: '30px',
                                        color: 'gray',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        textAlign: 'left',
                                        paddingLeft: '20px'
                                    }}
                                >
                                    <span className="font-semibold">Start a post</span>
                                </Button>
                            </div>
                            {/* Video, Photo, Write article buttons */}
                            <div className="flex flex-row border justify-between mt-3">
                                <Button className="!border-none" >
                                    <span className="text-white font-semibold !text-gray-600">Video</span>
                                </Button>
                                <Button className="!border-none" >
                                    <span className="text-white font-semibold !text-gray-600">Photo</span>
                                </Button>
                                <Button className="!border-none" >
                                    <span className="text-white font-semibold !text-gray-600">Write article</span>
                                </Button>
                            </div>
                        </div>
                        {/* Post */}
                        <div className="flex flex-col justify-between border w-[95%] justify-self-center mt-[10px] bg-white">
                            {/* User details Row: image, Name, desig., posted at, world icon */}
                            <div className="flex flex-row mx-2 mt-2">
                                <div>
                                    <img src="src\assets\avatar-colorful-48.png" alt="Profile Picture" />
                                </div>
                                <div className="ml-2">
                                    <p className="font-semibold">Eric Hu</p>
                                    <p className="text-xs">Software Developer | Technical Writer</p>
                                    <div className="flex flex-row items-center gap-1">
                                        <p className="text-xs">1w</p>
                                        <div>
                                            <img src="src\assets\earth-black-24.png" alt="Profile Picture" />
                                        </div>
                                        {/* world icon */}
                                    </div>
                                </div>
                            </div>
                            {/* Post desc. */}
                            <div className="mb-[10px] mx-2">
                                <p>Recruiters spend 7 seconds reading your resume.

                                    Here are 7 steps to guarantee you grab their attention:
                                    ...more
                                </p>
                            </div>
                            {/* Post image */}
                            <img src="src\assets\post-image.jpg" alt="Post image" />
                            {/* Actions Row */}
                            <div className="flex flex-row border justify-between mt-3">
                                <Button className="!border-none" style={{ background: 'none' }} >
                                    <span className="text-white font-semibold !text-gray-600">Like</span>
                                </Button>
                                <Button className="!border-none" style={{ background: 'none' }} >
                                    <span className="text-white font-semibold !text-gray-600">Comment</span>
                                </Button>
                                <Button className="!border-none" style={{ background: 'none' }} >
                                    <span className="text-white font-semibold !text-gray-600">Repost</span>
                                </Button>
                                <Button className="!border-none" style={{ background: 'none' }} >
                                    <span className="text-white font-semibold !text-gray-600">Send</span>
                                </Button>
                            </div>
                            {/* Avatar + Comment Input Row */}
                            <div className="flex flex-row mt-3">
                                <img src="src\assets\avatar-colorful-48.png" alt="Avatar" />
                                <Input
                                    placeholder="Start a post"
                                    style={{
                                        height: "48px",
                                        width: "467px",
                                        borderRadius: '30px',
                                        color: 'gray',
                                    }}
                                />
                            </div>
                            {/* The Ant Design Modal */}
                            <Modal
                                title="Create a post"
                                open={isModalOpen}
                                onCancel={handleCancel}
                                footer={[
                                    <Button key="image" type="text" className="float-left" onClick={handleImageClick}>
                                        📷 {/* Clicking this now triggers the explorer */}
                                    </Button>,
                                    <Button
                                        key="submit"
                                        type="primary"
                                        disabled={!postContent.trim() && !selectedImage}
                                        onClick={handlePost}
                                        className="rounded-full font-semibold"
                                    >
                                        Post
                                    </Button>
                                ]}
                            >
                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />

                                <div className="flex items-center gap-2 mb-4">
                                    <img src="src/assets/avatar-colorful-48.png" className="w-10 h-10 rounded-full" alt="User" />
                                    <div>
                                        <p className="font-semibold">{user?.name} {user?.lastName}</p>
                                    </div>
                                </div>

                                <Input.TextArea
                                    placeholder="What do you want to talk about?"
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    rows={4}
                                    variant="borderless"
                                />

                                {/* Image Preview Area */}
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
                            {/* Sort by button */}
                            <div>
                                <Dropdown trigger={'click'} menu={{ items }}>
                                    <Button type="text" icon={<img src="src\assets\chevron-down-light.png"></img>} iconPlacement="end">
                                        <span className="font-semibold">
                                            Most Relevant
                                        </span>
                                    </Button>
                                </Dropdown>
                            </div>
                            {/* Comments */}
                        </div>
                    </div>
                    {/* Suggestions */}
                    <div className="w-full min-[600px]:w-[576px] min-[768px]:w-[471px] min-[992px]:w-[387px] min-[1024px]:w-[300px] min-[1200px]:w-[300px] border flex-shrink-0 bg-white h-fit">
                        <p className="font-semibold">Add to your Feed</p>
                        {/* People to follow: Card */}
                        <div className="flex flex-row mt-[10px] ml-[10px]">
                            <div>
                                <img src="src\assets\avatar-colorful-48.png" alt="Avatar" />
                            </div>
                            <div className="ml-[5px]">
                                <p className="font-semibold text-sm">Name</p>
                                <p className="text-xs">Designation</p>
                                <Button type="text" style={{ border: '1px solid black', borderRadius: '30px', marginTop: '10px' }}>
                                    <span className="font-semibold">+ Follow</span>
                                </Button>
                            </div>
                        </div>
                        {/* People to follow: Card */}
                        <div className="flex flex-row mt-[10px] ml-[10px]">
                            <div>
                                <img src="src\assets\avatar-colorful-48.png" alt="Avatar" />
                            </div>
                            <div className="ml-[5px]">
                                <p className="font-semibold text-sm">Name</p>
                                <p className="text-xs">Designation</p>
                                <Button type="text" style={{ border: '1px solid black', borderRadius: '30px', marginTop: '10px' }}>
                                    <span className="font-semibold">+ Follow</span>
                                </Button>
                            </div>
                        </div>
                        {/* People to follow: Card */}
                        <div className="flex flex-row mt-[10px] ml-[10px]">
                            <div>
                                <img src="src\assets\avatar-colorful-48.png" alt="Avatar" />
                            </div>
                            <div className="ml-[5px]">
                                <p className="font-semibold text-sm">Name</p>
                                <p className="text-xs">Designation</p>
                                <Button type="text" style={{ border: '1px solid black', borderRadius: '30px', marginTop: '10px' }}>
                                    <span className="font-semibold">+ Follow</span>
                                </Button>
                            </div>
                        </div>
                        <Button type="text">
                            <span className="font-semibold">View all recommendations</span>
                            <img src="src\assets\arrow-right-16.png" alt="arrow right" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed
