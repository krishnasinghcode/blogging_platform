export const loginUser = async (formData) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed.');
        }

        return { success: true, message: 'Login successful!', data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const signupUser = async (formData) => {
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Signup failed. Please try again.');
        }

        return { success: true, message: 'Signup successful! Welcome aboard.', data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const verifyOTP = async (otp) => {
    try {
        const response = await fetch('/api/auth/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'OTP verification failed.');
        }

        return { success: true, message: 'Email verified successfully!', data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const requestPasswordReset = async (email) => {
    try {
        const response = await fetch('/api/auth/reset-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send password reset link.');
        }

        return { success: true, message: 'Reset link sent to your email!', data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const resetPassword = async (token, password) => {
    try {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Password reset failed.');
        }

        return { success: true, message: 'Password reset successfully!', data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
