import { Input, } from "antd";

function Profile() {

    return (
        <div class="bg-[#f4f2ee] border w-[100%]">
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
            {/* Profile avatar, banner + Settings/People Row */}
            <div className="flex flex-col md:flex-row border border-orange-500 w-[85%] justify-self-center">
                {/* Profile div: w-[804px]; h-201 <1200px; w-636 h-159; <922px: 396, 99; <768px: 576, 144 */}
                <div className="min-[768px]:w-[396px] min-[922px]:w-[636px] min-[1200px]:w-[804px] border md:mr-5 relative">
                    {/* bg banner */}
                    <div className="w-full bg-gray-300 
                                    h-[30vw] 
                                    min-[600px]:h-[120px]
                                    md:h-[144px] 
                                    min-[992px]:h-[99px] 
                                    xl:h-[159px] 
                                    min-[1400px]:h-[201px]
                                    ">
                        {/* Profile Avatar + '+' button */}
                        <div className="border border-solid">
                            <img className="absolute border top-17" src="src/assets/profile-placeholder-128.png" alt="Profile placeholder" />
                            <div className="flex justify-center items-center bg-white border border-[#0a66c2]
                             h-[30px] w-[30px] rounded-full absolute top-40 left-20">
                                <span className="text-[#0a66c2] text-[30px] ">+</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Profile language + Settings/People col */}
                <div className="flex flex-col md:w-[300px] mt-20 md:mt-0 border border-pink-600">
                    <div className="flex flex-row justify-between">
                        <div className="border">
                            <p className="text-lg font-semibold">Profile Language</p>
                            <p className="text-sm text-gray-600">English</p>
                        </div>
                        <div className="border">
                            <img src="src\assets\pencil-24.png" alt="Pencil icon." />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="border">
                            <p className="text-lg font-semibold">Public Profile & URL</p>
                            <p className="text-sm text-gray-600">www.linkedin.com/in/username</p>
                        </div>
                        <div className="border">
                            <img src="src\assets\pencil-24.png" alt="Pencil icon." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
