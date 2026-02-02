import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService.js';

function SignIn() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const hideLoading = message.loading('Signing in...', 0);
        try {
            const data = await loginUser(values);
            const accessToken = data?.tokens?.access?.token;
            const refreshToken = data?.tokens?.refresh?.token;

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                hideLoading();
                message.success("Signed in successfully!");
                navigate('/feed');
            } else {
                throw new Error("Authentication failed: No token received.");
            }
        } catch (error) {
            hideLoading();
            const errorMsg = error.response?.data?.message || error.message || "Failed to sign in.";
            message.error(errorMsg);
        }
    };

    const onFinishFailed = ({ errorFields }) => {
        if (errorFields.length > 0) {
            form.scrollToField(errorFields[0].name);
        }
    };

    return (
        <div className="flex border flex-col items-center bg-[#f3f2f0] min-h-screen">
            <div className="mb-[30px] mt-[30px] mx-6"></div>
            <div className="bg-white p-5 rounded-[8px] w-[400px] shadow-sm">
                <div>
                    <p className="font-semibold text-3xl mb-4">Sign In</p>
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <div className="flex flex-col gap-3 mb-6">
                        <Button
                            type="text"
                            className="!flex !items-center !justify-center !w-full !border !border-gray-300 !rounded-[50px] !py-5 hover:bg-gray-100"
                        >
                            <img src="/src/assets/google-white-48.png" alt="Google" className="w-5 h-5 mr-2" />
                            Continue with Google
                        </Button>
                        <Button
                            type="text"
                            className="!flex !items-center !justify-center !w-full !border !border-gray-300 !rounded-[50px] !py-5 hover:bg-gray-100"
                        >
                            <img src="/src/assets/microsoft-white-48.png" alt="Microsoft" className="w-5 h-5 mr-2" />
                            Continue with Microsoft
                        </Button>
                    </div>
                    <div className="flex items-center mb-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-sm text-gray-500 font-medium">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "Please enter an email address" },
                            { type: "email", message: "Please enter a valid email address" },
                        ]}
                    >
                        <Input type="email" placeholder="Email" className="!py-2" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please enter a password" }]}
                    >
                        <Input.Password
                            placeholder="Password"
                            className="!py-2"
                            iconRender={(visible) => (
                                <span className="text-[#0A66C2] font-semibold cursor-pointer">
                                    {visible ? "Hide" : "Show"}
                                </span>
                            )}
                        />
                    </Form.Item>
                    <div className="mb-2">
                        <a href="#" className="text-[#0A66C2] hover:underline font-semibold">
                            Forgot password?
                        </a>
                    </div>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className="mb-4">Keep me logged in</Checkbox>
                    </Form.Item>
                    <Form.Item className="mt-4">
                        <Button
                            className="!bg-[#004182] !rounded-[50px] !h-[50px]"
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            <span className="text-white font-semibold text-lg">Sign In</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="flex flex-row mt-6">
                <p className="mr-1">New to LinkedIn?</p>
                <button
                    onClick={() => navigate('/signup')}
                    className="text-[#0A66C2] hover:underline font-semibold bg-transparent border-none cursor-pointer"
                >
                    Join now
                </button>
            </div>
        </div>
    );
}

export default SignIn;