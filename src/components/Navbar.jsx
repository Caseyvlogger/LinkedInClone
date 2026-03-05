import { Input, Dropdown } from "antd";
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import axiosInstance from '../api/axiosInstance.js';

function Navbar(props) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            await axiosInstance.post('/auth/logout', { refreshToken });
        } catch (error) {
            console.warn("Server-side logout failed, clearing locally.");
        } finally {
            localStorage.clear();
            navigate('/home');
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <div className="flex flex-col p-2">
                    <span className="font-bold text-sm">{props.user?.name}</span>
                    <span className="text-xs text-gray-500">LinkedIn Clone User</span>
                </div>
            ),
        },
        { type: 'divider' },
        {
            key: '2',
            label: <Link to="/profile">View Profile</Link>,
        },
        {
            key: 'activity',
            label: <Link to="/my-activity">My Activity</Link>,
        },
        { type: 'divider' },
        {
            key: '4',
            label: (
                <span onClick={handleLogout} className="text-red-600 font-medium">
                    Sign Out
                </span>
            ),
        },
    ];

    return (
        <div className="flex h-[55px] bg-white mb-[20px] items-center justify-center sticky top-0 z-50 shadow-sm">
            <div className="flex w-[97%] flex-row items-center justify-between">
                <div className="shrink-0 cursor-pointer" onClick={() => navigate('/feed')}>
                    <img src="src/assets/linkedin-colorful-34.png" alt="Logo" />
                </div>

                <div className="flex flex-row items-center">
                    <NavItem icon="src/assets/home-filled-24.png" label="Home" onClick={() => navigate('/feed')} />
                    <NavItem icon="src/assets/people-24.png" label="My Network" onClick={() => navigate('/network')} />

                    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" arrow>
                        <div className="flex flex-col items-center cursor-pointer w-[75px] max-[747px]:w-[50px]">
                            <img src={props.user?.profilePicture || "src/assets/avatar-colorful-24.png"} alt="Me" className="rounded-full w-6 h-6 border border-gray-200" />
                            <div className="flex flex-row items-center">
                                <p className="text-xs max-[853px]:hidden">Me</p>
                                <img src="src/assets/arrow-down-10.png" alt="v" className="ml-1" />
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

const NavItem = ({ icon, label, onClick }) => (
    <div className="flex flex-col items-center cursor-pointer w-[75px] max-[747px]:w-[43px]" onClick={onClick}>
        <img src={icon} alt={label} />
        <p className="text-xs max-[853px]:hidden">{label}</p>
    </div>
);

export default Navbar;