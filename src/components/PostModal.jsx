import { useState, useRef } from "react";
import axiosInstance from "../api/axiosInstance";

import { Input, Button, message, Modal } from "antd";

import cameraIcon from '../assets/camera-30.png'

const PostModal = ({ setIsModalOpen, isModalOpen, user }) => {

    const [selectedImages, setSelectedImages] = useState([]); //Base64 previews.
    const [rawFiles, setRawFiles] = useState([]); // Actual file objs for backend.

    const [postContent, setPostContent] = useState("");

    const [filesLoading, setFilesLoading] = useState(false);
    const [posting, setPosting] = useState(false);

    const fileInputRef = useRef(null);

    //Show Spin or mapped images when filesLoading==true
    const showSpinOrImages = filesLoading ? (
        <div className="flex justify-center p-4">
            <Spin tip="Processing images..." />
        </div>
    ) : (
        selectedImages.length > 0 && (
            <div className="relative mt-4">
                {selectedImages.map((imgSrc, index) => (
                    <div key={index} className="relative group">
                        <img src={imgSrc} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg" />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            size="small"
                            hidden={filesLoading}
                            className="absolute top-1 right-1 opacity-80 hover:opacity-100"
                            onClick={() => removeSelectedImage(index)}
                        >
                            X
                        </Button>
                    </div>
                ))}
            </div>
        )
    )

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {

        //grab all files
        const files = Array.from(e.target.files);

        if (files.length === 0) return;
        // Max 5 images per post: Check explorer files (selected) + already selected files.
        if (files.length + selectedImages.length > 5) {
            return message.error('Please upload max. 5 images.')
        }
        setFilesLoading(true)
        files.forEach((file) => {
            //check each file
            if (file.size > 5242880) {
                return message.error(`${file.name} is over 5MB. Please choose of low size.`)
            }
            //Add file if check passes.
            setRawFiles((prev) => [...prev, file])

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImages((prev) => [...prev, reader.result])
            }
            //For previewing image (Raw binary to Base64)
            reader.readAsDataURL(file)
        })
        setFilesLoading(false)
        e.target.value = null;
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setPostContent("");
        setSelectedImages([]);
        setRawFiles([])
    };

    const handlePost = async () => {
        const hideLoading = message.loading('Creating post...', 0);

        try {
            setPosting(true);
            const formData = new FormData();
            formData.append('content', postContent)

            rawFiles.forEach(file => {
                formData.append('files', file)
            })

            const response = await axiosInstance.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (response.status === 201) {
                hideLoading()
                message.success("Post created successfully.")
                setIsModalOpen(false)
                setPostContent("")
                setSelectedImages([])// CLear only if succeeds (Good for UX).
                setRawFiles([])
                setPosting(false)
                //Refresh posts.
            }
        } catch (error) {
            setPosting(false)
            hideLoading();
            console.error("Post creation error:", error);
            const errorMsg = error.response?.data?.message || "Failed to create post.";
            message.error(errorMsg);
        }
    }

    const removeSelectedImage = (indexToRemove) => {
        setSelectedImages((prev) => prev.filter((_, index) => index !== indexToRemove))
        setRawFiles(prev => prev.filter((_, index) => index !== indexToRemove))
    }

    return (
        <Modal
            title="Create a post"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="image" type="text" className="float-left" onClick={handleImageClick}
                    icon={
                        <img
                            src={cameraIcon}
                            alt="upload-icon"
                            style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                        />
                    } />,
                <Button
                    key="submit"
                    type="primary"
                    loading={posting}
                    disabled={!postContent.trim() || posting || filesLoading}
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
                accept="image/*" //image of any extension.
                multiple
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
            {showSpinOrImages}
        </Modal>
    )
}

export default PostModal;