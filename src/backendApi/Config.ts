const config = {
  api: {
    baseUrl: "http://127.0.0.1:8000/api",
    login: "/auth/login",
    register: "/user",
    logout: "/auth/logout",
    contact: "/contact",
  },
};

const dummyConfig = {
  api: {
    baseUrl: "https://dummyjson.com",
    login: "/auth/login",
    register: "/register",
    logout: "/logout",
    contact: "/contact",
  },
};

enum configEnum {
  dummy,
  real,
}

const configType = configEnum.real;

export const currentConfig = () => {
  if (configType === configEnum.real) {
    return config;
  } else {
    return dummyConfig;
  }
};
