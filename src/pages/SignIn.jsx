import { Form, Input, Button, Card, Checkbox } from "antd";
import { useNavigate } from 'react-router-dom';

function SignIn() {

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("Form values:", values);
    };

    const onFinishFailed = ({ errorFields }) => {
        if (errorFields.length > 0) {
            form.scrollToField(errorFields[0].name);
        }
    };

    return (
        <div class="flex border flex-col items-center bg-[#f3f2f0]">
            {/* div for LinkedIn Clickable Icon */}

            <div className="mb-[30px] mt-[30px] mx-6">

            </div>

            {/* Form container: for tabs, laps, pcs w-[400px]*/}
            <div className="bg-white p-5 rounded-[8px] w-[400px]">
                <div>
                    <p className="font-semibold text-3xl">Sign In</p>
                </div>
                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item>
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
                    {/* or line */}

                    <Form.Item>
                        <div className="flex items-center !mb-[30px]">
                            <div className="flex-grow border-t border-gray-300"></div>

                            <span className="mx-3 text-sm text-gray-500 font-medium whitespace-nowrap">
                                or
                            </span>

                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        {/* Email */}
                        <Form.Item
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
                                placeholder="Enter email"
                                autoComplete="email"
                            />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter a password",
                                }
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


                        <div className="flex flex-row">
                            <a href="#" className="text-blue-600 hover:underline font-semibold hover:bg-blue-500">
                                Forgot Password?
                            </a>
                        </div>

                        <Checkbox className="!mt-[10px] !mb-[10px]">
                            Keep me logged in
                        </Checkbox>
                    </Form.Item>

                    {/* Submit */}
                    <Form.Item>
                        <Button className="!bg-[#004182] !rounded-[50px] !py-[25px]" type="primary" htmlType="submit" block>
                            <span className="text-white font-semibold">Sign In</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="flex flex-row mt-[10px]">
                <p className="mr-[5px]">New to LinkedIn?</p>
                <a onClick={()=>{navigate('/signup')}} className="text-blue-600 hover:underline font-semibold">
                    Join Now
                </a>
            </div>
        </div>
    )
}

export default SignIn
