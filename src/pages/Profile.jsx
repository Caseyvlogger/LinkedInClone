import Navbar from "../components/NavBar";

function Profile() {

    return (
        <div class="bg-[#f4f2ee] border w-[100%]">
            {/* Navbar */}
            <Navbar />
            {/* Profile details + Settings/People Row */}
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
