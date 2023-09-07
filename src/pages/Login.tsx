import React, { useContext, useReducer, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import icons from "../assets/icons/icons";
import images from "../assets/images/images";
import InputField from "../component/Input/InputField";
import PageLoader from "../component/Loader/PageLoader";
import {
  NotificationType,
  useNotification,
} from "../contexts/NotificationContext";
import { handleLogin } from "../handlers/loginHandler";
import {
  createResponseError,
  ErrorDetails,
  getErrorMessage,
} from "../utils/errorHandler";

enum loginActionType {
  SET_USERNAME = "SET_USERNAME",
  SET_PASSWORD = "SET_PASSWORD",
  SET_USERNAMEERROR = "SET_USERNAMEERROR",
  SET_PASSWORDERROR = "SET_PASSWORDERROR",
  SET_ERROR = "SET_ERROR",
  SET_LOGINISAVAIL = "SET_LOGIN",
}

interface loginAction {
  type: loginActionType;
  payload: string;
}

interface loginState {
  username: string;
  usernameIsValid: boolean;
  usernameError: string;
  password: string;
  passwordIsValid: boolean;
  passwordError: string;
  loginIsValid: boolean;
}

const usernameReducer = (
  state: loginState,
  action: loginAction,
): loginState => {
  switch (action.type) {
    case loginActionType.SET_USERNAME:
      // const mailformat = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
      // if (action.payload.match(mailformat)) {
      //   return {
      //     ...state,
      //     usernameIsValid: true,
      //     username: action.payload,
      //   };
      // } else {
      //   return {
      //     ...state,
      //     usernameIsValid: false,
      //     username: action.payload,
      //   };
      // }
      return {
        ...state,
        usernameIsValid: true,
        username: action.payload,
      };
    case loginActionType.SET_PASSWORD:
      if (action.payload.length > 1) {
        return {
          ...state,
          passwordIsValid: true,
          password: action.payload,
        };
      } else {
        return {
          ...state,
          passwordIsValid: false,
          password: action.payload,
        };
      }
    case loginActionType.SET_LOGINISAVAIL:
      if (state.usernameIsValid && state.passwordIsValid) {
        return {
          ...state,
          loginIsValid: true,
        };
      } else {
        return {
          ...state,
          loginIsValid: false,
        };
      }
    case loginActionType.SET_USERNAMEERROR:
      if (state.usernameIsValid) {
        return {
          ...state,
          usernameError: "",
        };
      } else if (action.payload === "") {
        return {
          ...state,
          usernameError: "Email is required",
        };
      } else {
        return {
          ...state,
          usernameError: "Email is not valid",
        };
      }
    case loginActionType.SET_PASSWORDERROR:
      if (state.passwordIsValid) {
        return {
          ...state,
          passwordError: "",
        };
      } else if (action.payload === "") {
        return {
          ...state,
          passwordError: "Password is required",
        };
      } else {
        return {
          ...state,
          passwordError: "Password must be at least 8 characters",
        };
      }
    case loginActionType.SET_ERROR:
      return {
        ...state,
        usernameError: action.payload,
        passwordError: action.payload,
      };
    default:
      return state;
  }
};

const Login = () => {
  const [loginState, setLoginState] = useReducer(usernameReducer, {
    username: "",
    usernameIsValid: false,
    usernameError: "",
    password: "",
    passwordIsValid: false,
    passwordError: "",
    loginIsValid: false,
  });

  const navigate = useNavigate();
  const { addNotification } = useNotification();

  async function loginHandler(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setIsShowPageLoader(true);
    try {
      await handleLogin(loginState.username, loginState.password);
      navigate("/");
      addNotification({
        type: NotificationType.SUCCESS,
        message: "Login Success",
      });
    } catch (errorDetails) {
      addNotification({
        type: NotificationType.ERROR,
        message: "Login Failed, " + (errorDetails as ErrorDetails).errorMessage,
      });
    }
    setIsShowPageLoader(false);
  }
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isShowPageLoader, setIsShowPageLoader] = useState(false);

  return (
    <>
      <div className="h-screen w-screen bg-[#22436C]">
        <img
          src={icons.loginBg.gray}
          alt=""
          className="mx-auto h-full w-full object-cover"
        />
      </div>
      <div className="absolute flex justify-normal items-center top-0 left-0 w-screen h-screen">
        <div className="h-full w-full">
          <img
            src={images.logoPutih135}
            alt=""
            className="relative top-1/2 left-1/2 h-auto w-auto translate-x-[-50%] translate-y-[-50%]"
          />
        </div>
        <div className="flex flex-col h-[90%] w-1/2 bg-white rounded mr-10 p-9 justify-between">
          <div className="h-6 w-full">
            <img src={images.logoHitam183} alt="" className="h-full w-auto" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#22436C] font-jakarta">
              Welcome!
            </h1>
            <p className="text-sm text-[#757575] font-jakarta">
              Please input your credentials to login
            </p>
            <form onSubmit={loginHandler} className="mt-6">
              <InputField
                label="Email"
                id="email"
                labelStyle="font-jakarta"
                onBlur={(event) => {
                  setLoginState({
                    type: loginActionType.SET_USERNAMEERROR,
                    payload: event.target.value,
                  });
                  setIsUsernameFocus(false);
                }}
                onFocus={(event) => {
                  setIsUsernameFocus(true);
                }}
                isError={loginState.usernameError !== "" && !isUsernameFocus}
                onChange={(event) => {
                  setLoginState({
                    type: loginActionType.SET_USERNAME,
                    payload: event.target.value,
                  });
                  setLoginState({
                    type: loginActionType.SET_LOGINISAVAIL,
                    payload: "",
                  });
                }}
                textHelper={loginState.usernameError}
              ></InputField>
              <InputField
                label="Password"
                id="pass"
                type="password"
                labelStyle="font-jakarta"
                onBlur={(event) => {
                  setLoginState({
                    type: loginActionType.SET_PASSWORDERROR,
                    payload: event.target.value,
                  });
                  setIsPasswordFocus(false);
                }}
                onFocus={(event) => {
                  setIsPasswordFocus(true);
                }}
                isError={loginState.passwordError !== "" && !isPasswordFocus}
                onChange={(event) => {
                  setLoginState({
                    type: loginActionType.SET_PASSWORD,
                    payload: event.target.value,
                  });
                  setLoginState({
                    type: loginActionType.SET_LOGINISAVAIL,
                    payload: "",
                  });
                }}
                textHelper={loginState.passwordError}
              ></InputField>
              <button
                type="submit"
                className="rounded w-full h-12 mt-6 bg-[#4487D9] text-white font-jakarta text-sm font-semibold disabled:bg-[#C2C2C2] disabled:cursor-not-allowed"
                disabled={!loginState.loginIsValid}
              >
                Login
              </button>
            </form>
          </div>
          <div>
            <p className="text-sm font-jakarta text-[#C2C2C2] text-center">
              PLABS.ID|2022
            </p>
          </div>
        </div>
      </div>
      {createPortal(<PageLoader isShow={isShowPageLoader} />, document.body)}
    </>
  );
};

export default Login;
