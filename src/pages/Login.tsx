import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/authApi";
import { setUser } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [login, { data, error, }] = useLoginMutation()
    const dispatch = useAppDispatch();
    const onSubmit = async (data) => {
        const userInfo = {
            id: data.uesrId,
            password: data.password
        }

        const res = await login(userInfo).unwrap(); // unwrap for reduce data path step

        const user = verifyToken(res.data.accessToken);

        dispatch(setUser({ user: user, token: res.data.accessToken }));




    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <label htmlFor="id">Id:</label>
                    <input className="border" {...register('uesrId')} type="text" id="id" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className="border" {...register('password')} type="text" id="password" />
                </div>
                <Button htmlType="submit">Login</Button>
            </form>
        </div>
    );
};

export default Login;