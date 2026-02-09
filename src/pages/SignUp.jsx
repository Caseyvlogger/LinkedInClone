import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../services/authService.js";

function SignUp() {

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = async (values) => {
        const hideLoading = message.loading('Creating your account...', 0);

        try {
            const response = await registerUser(values)

            const accessToken = response.data?.tokens?.access?.token;
            const refreshToken = response.data?.tokens?.refresh?.token;

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                hideLoading();
                message.success("Account created successfully!");

                navigate('/feed');
            } else {
                throw new Error("Registration failed: No token received.");
            }
        } catch (error) {
            hideLoading();
            const errorMsg = error.response?.data?.message || error.message || "Failed to register.";
            message.error(errorMsg);
        }
    };


    const onFinishFailed = ({ errorFields }) => {
        if (errorFields.length > 0) {
            form.scrollToField(errorFields[0].name);
        }
    };

    return (
        <div class="flex border flex-col items-center bg-[#f3f2f0]">
            {/* div for LinkedIn Icon */}
            {/* Title */}
            <div className="mb-[30px] mt-[30px] mx-6 border">
                <p className="text-3xl">Make the most of your professional life</p>
            </div>

            {/* Form container: for tabs, laps, pcs w-[400px]*/}
            <div className="bg-white p-5 rounded-[8px] w-[400px]">
                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    {/* First Name */}
                    <Form.Item
                        label="First Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your first name" }]}
                    >
                        <Input placeholder="First Name" />
                    </Form.Item>

                    {/* Last Name */}
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: "Please enter your last name" }]}
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    {/* Email */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter an email address",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email address",
                            },
                        ]}
                    >
                        <Input
                            type="email"
                            placeholder="example@email.com"
                            autoComplete="email"
                        />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter a password",
                            },
                            {
                                min: 6,
                                message: "Please enter 6 characters or more",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter password"
                            autoComplete="current-password"
                            iconRender={(visible) => (
                                <span style={{
                                    color: "#0A66C2", fontWeight: 600, cursor: "pointer"
                                }}>
                                    {visible ? "Hide" : "Show"}
                                </span>
                            )}
                        />
                    </Form.Item>
                    <Checkbox className="!mt-[10px] !mb-[10px]">
                        Remember me
                    </Checkbox>
                    <Form.Item>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            By clicking <strong>Agree &amp; Join</strong> or <strong>Continue</strong>,
                            you agree to the LinkedIn{" "}
                            <a href="#" className="text-[#0A66C2] font-bold hover:underline">
                                User Agreement
                            </a>
                            ,{" "}
                            <a href="#" className="text-[#0A66C2] font-bold hover:underline">
                                Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-[#0A66C2] font-bold hover:underline">
                                Cookie Policy
                            </a>.
                        </p>
                    </Form.Item>
                    <Form.Item>
                        <div className="flex items-center !mb-[30px]">
                            <div className="flex-grow border-t border-gray-300"></div>

                            <span className="mx-3 text-sm text-gray-500 font-medium whitespace-nowrap">
                                or
                            </span>

                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <div className="flex flex-col gap-3 mt-4">
                            {/* Google */}
                            <Button
                                type="text"
                                className="!flex !items-center !justify-center !w-full !border !border-gray-300 !rounded-[50px] !py-5 hover:bg-gray-100"
                                onClick={() => console.log("Google login clicked")}
                            >
                                <img
                                    src="src\assets\google-white-48.png"
                                    alt="Google"
                                    className="w-5 h-5 mr-2"
                                />
                                Continue with Google
                            </Button>

                            {/* Microsoft */}
                            <Button
                                type="text"
                                className="!flex !items-center !justify-center !w-full !border !border-gray-300 !rounded-[50px] !py-5 hover:bg-gray-100"
                                onClick={() => console.log("Microsoft login clicked")}
                            >
                                <img
                                    src="src\assets\microsoft-white-48.png"
                                    alt="Microsoft"
                                    className="w-5 h-5 mr-2"
                                />
                                Continue with Microsoft
                            </Button>
                        </div>
                    </Form.Item>

                    {/* Submit */}
                    <Form.Item>
                        <Button className="!bg-[#004182] !rounded-[50px] !py-[25px]" type="primary" htmlType="submit" block>
                            <span className="text-white font-semibold">Agree and Join</span>
                        </Button>
                    </Form.Item>
                </Form>
                {/* or line */}

                {/* Sign In link */}
                <div className="flex flex-row justify-self-center">
                    <p className="mr-[5px]">Already on LinkedIn?</p>
                    <a onClick={() => navigate('/signin')} className="text-blue-600 hover:underline font-semibold">
                        Sign in
                    </a>
                </div>
            </div>
            <div className="flex flex-row mt-[10px]">
                <p className="mr-[5px]">Looking to create a page for a business?</p>
                <a href="#" className="text-blue-600 hover:underline font-semibold">
                    Get help
                </a>
            </div>
        </div>
    )
}

export default SignUp
