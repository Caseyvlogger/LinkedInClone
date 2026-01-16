import { Input, Button, Dropdown } from "antd";

function Feed() {
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
    return (
        <div className="bg-[#f4f2ee]">{/* Change bg */}
            {/* Navbar */}
            <div className=" flex h-[55px] bg-white mb-[20px] items-center justify-center">
                <div className="flex border w-[97%] flex-row items-center ">
                    <div className="shrink-0 border">
                        <img src="src\assets\linkedin-colorful-34.png" alt="LinkedIn Logo" />
                    </div>
                    {/* For w-full:280w,34h and for w-[1024px]:hide input, show icon*/}
                    {/* Input + Navbar row justify-between container */}
                    <div className="flex flex-row justify-between w-full max-[601px]:h-[37px] items-center">
                        <Input
                            placeholder="Start a post"
                            style={{
                                height: "34px",
                                width: "280px",
                                borderRadius: '30px',
                                color: 'gray',
                            }}
                            className="max-[601px]:!hidden"
                        />
                        {/* nav buttons Row*/}
                        <div className="flex flex-row ">
                            {/* Nav button responsive */}
                            <div className="flex flex-col items-center border w-[75px] max-[748px]:w-fit max-[747px]:w-[50px]">
                                <div>
                                    <img src="src\assets\home-filled-24.png" alt="Home" />
                                </div>
                                <p className="text-xs max-[853px]:hidden">Home</p>
                            </div>
                            <div className="flex flex-col items-center border w-[75px] max-[748px]:w-fit max-[747px]:w-[50px]">
                                <div>
                                    <img src="src\assets\people-24.png" alt="Home" />
                                </div>
                                <p className="text-xs max-[853px]:hidden">My Network</p>
                            </div>
                            <div className="flex flex-col items-center border w-[75px] max-[748px]:w-fit max-[747px]:w-[50px]">
                                <div>
                                    <img src="src\assets\briefcase-24.png" alt="Home" />
                                </div>
                                <p className="text-xs max-[853px]:hidden">Jobs</p>
                            </div>
                            <div className="flex flex-col items-center border w-[75px] max-[748px]:w-fit max-[747px]:w-[50px]">
                                <div>
                                    <img src="src\assets\bubble-24.png" alt="Home" />
                                </div>
                                <p className="text-xs max-[853px]:hidden">Messaging</p>
                            </div>
                            <div className="flex flex-col items-center border w-[75px] max-[748px]:w-fit max-[747px]:w-[50px]">
                                <div>
                                    <img src="src\assets\bell-24.png" alt="Home" />
                                </div>
                                <p className="text-xs max-[853px]:hidden">Notifications</p>
                            </div>
                            <div className="flex flex-col items-center border w-[75px] max-[748px]:w-fit max-[747px]:w-[50px]">
                                <div>
                                    <img src="src\assets\avatar-colorful-24.png" alt="Home" />
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="text-xs max-[853px]:hidden">Me</p>
                                    <div className="ml-1">
                                        <img src="src\assets\arrow-down-10.png" alt="Arrow down" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
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
                    {/* Details */}
                    <div className="mt-10 ml-3">
                        <p className="font-semibold">Name</p>
                        <p className="text-xs">Completed education at Comsats University Cantt</p>
                        <p className="text-xs text-gray-500">Rawalpindi, Punjab</p>
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
