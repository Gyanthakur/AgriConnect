export const sendLoginOTP = async (values) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login/request-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message ?? "Error sending OTP");
    }
    return {
        ok: response.ok,
    };
}

export const verifyLoginOTP = async (values) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login/verify-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message ?? "Error verifying OTP");
    }
    return {
        token: data.token,
        ok: response.ok,
    };
}

export const sendRegistrationOTP = async (values) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register/request-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message ?? "Error sending OTP");
    }
    return {
        ok: response.ok,
    };
}

export const verifyRegistrationOTP = async (values) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register/verify-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message ?? "Error verifying OTP");
    }
    return {
        token: data.token,
        ok: response.ok,
    };
}

