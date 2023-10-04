const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const {
	SALT_ROUNDS_FOR_HASH,
	USER_JWT_SECRET_KEY,
	ADMIN_JWT_SECRET_KEY,
	CORE_JWT_SECRET_KEY,
	COMMS_BASE_URL,
} = require("../config");

const hashPin = (pin) => {
	return bcrypt.hashSync(pin, SALT_ROUNDS_FOR_HASH);
};

const comparePin = (pin, hash) => {
	return bcrypt.compareSync(pin, hash);
};

const generateJWT = (details, expIn) => {
	const token = jwt.sign(details, USER_JWT_SECRET_KEY, {
		expiresIn: expIn,
	});
	
	return {
		token,
		iat: jwt.decode(token).iat,
		expiresIn: jwt.decode(token).exp,
	};
};

const generateJWTForService = (payload, secretKey) => {
	return jwt.sign(payload, secretKey);
};

const verifyJWT = (token) => {
	try {
		const user = jwt.verify(token, USER_JWT_SECRET_KEY)
		delete user.exp
		delete user.iat

		return {
			verified: true,
			user_details: user,
		}
	} catch (error) {
		return {verified: false}
	}
  
}

const verifyJWTForService = (token, secretKey) => {
	return jwt.verify(token, secretKey);
};

const send_otp = async (phone, user_id, country, version) => {
	//genrate token for sending to the service
	try {
		const payload = {
			service: "core",
			ip_address: "CORE_IP_ADDRESS",
		};
		const token = await generateJWTForService(payload, CORE_JWT_SECRET_KEY);

		//set config
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				"api-service": "core",
			},
		};

		const body = {
			phone,
			user_id,
		};

		const { data } = await axios.post(
			`${COMMS_BASE_URL}/${country}/${version}/sms/send-otp`,
			body,
			config
		);
		return {
			status: "success",
			data,
		};
	} catch (error) {
		console.log(error);
		if (error.response) {
			return {
				status: "failed",
				data: error.response?.data || error.response,
			};
		}
		return {
			status: "failed",
			data: {
				message:
					"an error occurred while we were trying to process your request",
			},
		};
	}
};

const verify_otp = async (otp_id, phone, code, country, version) => {
  //genrate token for sending to the service
  try {
    const payload = {
      service: "core",
      ip_address: "CORE_IP_ADDRESS",
    }
    const token = await generateJWTForService(payload, CORE_JWT_SECRET_KEY)

		//set config
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				"api-service": "core",
			},
		};

    const body = {
      otp_id,
	  phone,
      code
    }

		const { data } = await axios.post(
			`${COMMS_BASE_URL}/${country}/${version}/sms/verify-otp`,
			body,
			config
		);

		// console.log(data)

		return {
			status: "success",
			data,
		};
	} catch (error) {
		console.log(error);
		if (error.response) {
			return {
				status: "failed",
				data: error.response?.data || error.response,
			};
		}
		return {
			status: "failed",
			data: {
				message:
					"an error occurred while we were trying to process your request",
			},
		};
	}
};

const generateAdminJWT = (details, expIn) => {
	const token = jwt.sign(details, ADMIN_JWT_SECRET_KEY, {
		expiresIn: expIn,
	});
	
	return {
		token,
		iat: jwt.decode(token).iat,
		expiresIn: jwt.decode(token).exp,
	};
};

const verifyAdminJWT = (token) => {
	try {
		const user = jwt.verify(token, ADMIN_JWT_SECRET_KEY)
		delete user.exp
		delete user.iat

		return {
			verified: true,
			admin_details: user,
		}
	} catch (error) {
		return {verified: false}
	}
  
}

module.exports = {
	hashPin,
	comparePin,
	generateJWT,
	verifyJWT,
	generateJWTForService,
	verifyJWTForService,
	send_otp,
	verify_otp,
	generateAdminJWT,
	verifyAdminJWT
};
