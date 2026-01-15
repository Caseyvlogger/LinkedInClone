import { Input, Button } from "antd";

function Feed() {

    return (
        <div>{/* Change bg */}
            {/* Navbar */}
            <div className="h-[55px] bg-gray-300 mb-[20px]"></div>
            {/* w-full for small screens */}
            <div className="flex md:flex-row lg:flex-row justify-self-center flex-col border border-red-700 mx-5
             justify-center bg-[#f4f2ee]">
                {/* Profile mt-[10px] */}
                <div className="w-full min-[600px]:w-[576px] md:w-[225px] lg:w-[225px] border mr-[20px] flex-shrink-0">
                    <p>Profile</p>
                </div>
                {/*Feed, Suggestions  className="ml-[5px]"col when tablet*/}
                <div className="flex flex-col md:flex-col lg:flex-row">
                    {/* Feed */}
                    <div className="w-full min-[600px]:w-[576px] min-[768px]:w-[471px] min-[992px]:w-[387px] min-[1200px]:w-[555px] border mr-[20px] flex-shrink-, marginTop:'10px'0">
                        {/* Avatar + Input row */}
                        <div className="flex flex-col justify-between border w-[95%] justify-self-center ">
                            <div className="flex flex-row">
                                <img src="src\assets\avatar-duo-48.png" alt="Avatar" />
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
                    </div>
                    {/* Suggestions */}
                    <div className="w-full min-[600px]:w-[576px] min-[768px]:w-[471px] min-[992px]:w-[387px] min-[1024px]:w-[300px] min-[1200px]:w-[300px] border flex-shrink-0">
                        <p className="font-semibold ml-[10px]">Add to your Feed</p>
                        {/* People to follow: Card */}
                        <div className="flex flex-row mt-[10px] ml-[10px]">
                            <div>
                                <img src="src\assets\avatar-duo-48.png" alt="Avatar" />
                            </div>
                            <div className="ml-[5px]">
                                <p className="font-semibold text-sm">Name</p>
                                <p className="text-xs">Designation</p>
                                <Button type="text" style={{ border: '1px solid black', borderRadius: '30px', marginTop:'10px' }}>
                                    <span className="font-semibold">+ Follow</span>
                                </Button>
                            </div>
                        </div>
                        {/* People to follow: Card */}
                        <div className="flex flex-row mt-[10px] ml-[10px]">
                            <div>
                                <img src="src\assets\avatar-duo-48.png" alt="Avatar" />
                            </div>
                            <div className="ml-[5px]">
                                <p className="font-semibold text-sm">Name</p>
                                <p className="text-xs">Designation</p>
                                <Button type="text" style={{ border: '1px solid black', borderRadius: '30px', marginTop:'10px' }}>
                                    <span className="font-semibold">+ Follow</span>
                                </Button>
                            </div>
                        </div>
                        {/* People to follow: Card */}
                        <div className="flex flex-row mt-[10px] ml-[10px]">
                            <div>
                                <img src="src\assets\avatar-duo-48.png" alt="Avatar" />
                            </div>
                            <div  className="ml-[5px]">
                                <p className="font-semibold text-sm">Name</p>
                                <p className="text-xs">Designation</p>
                                <Button type="text" style={{ border: '1px solid black', borderRadius: '30px', marginTop:'10px' }}>
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
